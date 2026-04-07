import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { topic, customPrompt, referenceImageUrl } = await req.json();
    if (!topic && !customPrompt) {
      return new Response(JSON.stringify({ error: "Missing topic or customPrompt" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Generating blog cover:", { topic, hasCustomPrompt: !!customPrompt, hasReference: !!referenceImageUrl });

    // Build the prompt - use customPrompt if provided, otherwise use the default
    const prompt = customPrompt
      ? customPrompt
      : `Create a professional, modern editorial blog cover image (16:9 landscape) about "${topic}" in the context of industrial smoke abatement and air filtration systems. Style: clean, high-tech industrial photography with green (#6BBF3D) accent highlights, professional lighting, modern factory or kitchen environment. Do NOT add any text, watermarks, logos, or overlays. The image should be purely photographic and editorial.`;

    // Build message content - if reference image provided, use multimodal
    const messageContent: any[] = [{ type: "text", text: prompt }];

    if (referenceImageUrl) {
      messageContent.push({
        type: "image_url",
        image_url: { url: referenceImageUrl },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        messages: [{ role: "user", content: messageContent }],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Image generation error:", response.status, errText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit, riprova tra qualche secondo." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crediti esauriti." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image returned:", JSON.stringify(data).substring(0, 500));
      throw new Error("No image returned from AI");
    }

    const base64Data = imageUrl.split(",")[1];
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const safeName = (topic || "cover").replace(/[^a-z0-9]/gi, "-").substring(0, 40);
    const fileName = `blog-covers/${Date.now()}-${safeName}.png`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, bytes, { contentType: "image/png", upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Failed to upload cover image");
    }

    const { data: publicUrl } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    console.log("Blog cover generated:", publicUrl.publicUrl);

    return new Response(JSON.stringify({ success: true, imageUrl: publicUrl.publicUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("generate-blog-cover error:", e?.message || e);
    return new Response(JSON.stringify({ error: e?.message || "Unexpected error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
