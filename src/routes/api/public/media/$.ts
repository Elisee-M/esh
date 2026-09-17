import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const splat = (params as { _splat?: string })._splat ?? "";
        const [bucket, ...rest] = splat.split("/");
        const key = rest.join("/");
        if (!bucket || !key || key.includes("..")) {
          return new Response("Not found", { status: 404 });
        }
        if (bucket !== "gallery" && bucket !== "project-media") {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from(bucket).createSignedUrl(key, 60 * 60);
        if (error || !data?.signedUrl) {
          return new Response("Not found", { status: 404 });
        }

        return new Response(null, {
          status: 302,
          headers: {
            location: data.signedUrl,
            "cache-control": "public, max-age=1800",
          },
        });
      },
    },
  },
});
