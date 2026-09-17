import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const projectColumns =
  "id, title, slug, short_description, full_description, category, client_name, project_date, location, services, cover_image_url, video_url, featured, created_at";

export const listPublishedProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicClient } = await import("./supabase-public.server");
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectColumns)
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPublishedProject = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { createPublicClient } = await import("./supabase-public.server");
    const supabase = createPublicClient();
    const { data: project, error } = await supabase
      .from("projects")
      .select(projectColumns)
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!project) return null;

    const { data: media } = await supabase
      .from("project_media")
      .select("id, image_url, caption, sort_order")
      .eq("project_id", project.id)
      .order("sort_order", { ascending: true });

    return { project, media: media ?? [] };
  });

export const listPublishedGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicClient } = await import("./supabase-public.server");
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, title, description, image_url, category, featured, created_at")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) throw new Error("Could not send your message. Please try again.");
    return { ok: true };
  });

const bookingSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(120),
  event_type: z.string().trim().max(120).optional().or(z.literal("")),
  event_date: z.string().trim().max(20).optional().or(z.literal("")),
  event_location: z.string().trim().max(200).optional().or(z.literal("")),
  audience_size: z.string().trim().max(60).optional().or(z.literal("")),
  budget_range: z.string().trim().max(60).optional().or(z.literal("")),
  requirements: z.string().trim().max(3000).optional().or(z.literal("")),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("booking_requests").insert({
      full_name: data.full_name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      event_type: data.event_type || null,
      event_date: data.event_date || null,
      event_location: data.event_location || null,
      audience_size: data.audience_size || null,
      budget_range: data.budget_range || null,
      requirements: data.requirements || null,
      message: data.message || null,
    });
    if (error) throw new Error("Could not send your request. Please try again.");
    return { ok: true };
  });
