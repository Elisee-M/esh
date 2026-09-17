import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

type Ctx = { supabase: any; userId: string };

async function assertAdmin(context: Ctx) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Forbidden");
}

export const getMyAdminStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data) };
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const count = async (table: string, filter?: (q: any) => any) => {
      let q = context.supabase.from(table).select("id", { count: "exact", head: true });
      if (filter) q = filter(q);
      const { count: c } = await q;
      return c ?? 0;
    };
    return {
      projects: await count("projects"),
      publishedProjects: await count("projects", (q) => q.eq("published", true)),
      gallery: await count("gallery_items"),
      bookings: await count("booking_requests"),
      pendingBookings: await count("booking_requests", (q) => q.eq("status", "pending")),
      messages: await count("contact_submissions"),
      unreadMessages: await count("contact_submissions", (q) => q.eq("is_read", false)),
    };
  });

/* ---------------- uploads ---------------- */

export const uploadImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        bucket: z.enum(["gallery", "project-media"]),
        fileName: z.string().min(1).max(200),
        contentType: z.string().min(3).max(100),
        dataBase64: z.string().min(10),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    if (!data.contentType.startsWith("image/")) throw new Error("Only images are allowed");
    const bytes = Uint8Array.from(atob(data.dataBase64), (c) => c.charCodeAt(0));
    if (bytes.byteLength > 20 * 1024 * 1024) throw new Error("Image is too large (max 20MB)");
    const safe = data.fileName.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
    const key = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from(data.bucket)
      .upload(key, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(error.message);
    return { url: `/api/public/media/${data.bucket}/${key}` };
  });

/* ---------------- projects ---------------- */

export const adminListProjects = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data, error } = await context.supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const projectSchema = z.object({
  id: z.string().uuid().optional().or(z.literal("")),
  title: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(160),
  short_description: z.string().trim().max(400).default(""),
  full_description: z.string().trim().max(8000).default(""),
  category: z.string().trim().min(1).max(80).default("General"),
  client_name: z.string().trim().max(160).optional().or(z.literal("")),
  project_date: z.string().trim().max(20).optional().or(z.literal("")),
  location: z.string().trim().max(200).optional().or(z.literal("")),
  services: z.array(z.string().trim().max(80)).default([]),
  cover_image_url: z.string().trim().max(500).optional().or(z.literal("")),
  video_url: z.string().trim().max(500).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
});

export const adminSaveProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => projectSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { id, ...rest } = data;
    const payload = {
      ...rest,
      client_name: rest.client_name || null,
      project_date: rest.project_date || null,
      location: rest.location || null,
      cover_image_url: rest.cover_image_url || null,
      video_url: rest.video_url || null,
    };
    if (id) {
      const { error } = await context.supabase.from("projects").update(payload).eq("id", id);
      if (error) throw new Error(error.message);
      return { id };
    }
    const { data: created, error } = await context.supabase
      .from("projects")
      .insert(payload)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: created.id as string };
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListProjectMedia = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ projectId: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { data: rows, error } = await context.supabase
      .from("project_media")
      .select("*")
      .eq("project_id", data.projectId)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const adminAddProjectMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        projectId: z.string().uuid(),
        imageUrl: z.string().min(3).max(500),
        caption: z.string().trim().max(200).optional().or(z.literal("")),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from("project_media").insert({
      project_id: data.projectId,
      image_url: data.imageUrl,
      caption: data.caption || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProjectMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from("project_media").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------------- gallery ---------------- */

export const adminListGallery = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data, error } = await context.supabase
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminSaveGalleryItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid().optional().or(z.literal("")),
        title: z.string().trim().max(160).default(""),
        description: z.string().trim().max(600).optional().or(z.literal("")),
        image_url: z.string().min(3).max(500),
        category: z.string().trim().min(1).max(80).default("General"),
        featured: z.boolean().default(false),
        published: z.boolean().default(true),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { id, ...rest } = data;
    const payload = { ...rest, description: rest.description || null };
    if (id) {
      const { error } = await context.supabase.from("gallery_items").update(payload).eq("id", id);
      if (error) throw new Error(error.message);
      return { ok: true };
    }
    const { error } = await context.supabase.from("gallery_items").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteGalleryItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from("gallery_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------------- bookings ---------------- */

export const adminListBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data, error } = await context.supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpdateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "contacted", "confirmed", "completed", "cancelled"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase
      .from("booking_requests")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from("booking_requests").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ---------------- messages ---------------- */

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context as Ctx);
    const { data, error } = await context.supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminSetMessageRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), isRead: z.boolean() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase
      .from("contact_submissions")
      .update({ is_read: data.isRead })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as Ctx);
    const { error } = await context.supabase.from("contact_submissions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
