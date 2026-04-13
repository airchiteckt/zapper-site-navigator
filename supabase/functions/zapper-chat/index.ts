import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sei l'assistente tecnico virtuale di ZAPPER®, azienda italiana leader nei sistemi di abbattimento fumi, odori e particolato per impianti a combustione.

Il tuo ruolo:
1. CONSULENTE TECNICO: Aiuti i clienti a capire quale soluzione ZAPPER è adatta al loro impianto.
2. LEAD GENERATION: Quando il cliente mostra interesse concreto, chiedi di lasciare i dati di contatto per essere ricontattato dall'ufficio tecnico.

Modelli principali:
- ZPZ / ZPZ MAX: forni a legna (pizzerie, panifici)
- ZPZ Nuvola / Nuvola L: forni elettrici
- ZPF / ZPF MAX: panificazione
- ZBR S / ZBR MAX: bracerie e braci/carbone
- ZGR / ZGR MAX: girarrosti
- DESTINK / DESTINK MAX / DESTINK ULTRA / DESTINK ULTRA MAX: cappe e cucine professionali
- ZCL / ZCL MAX: caldaie a biomassa
- ZCM: camini e stufe domestiche
- ZTRF / ZTRF MAX / ZTRF MAX DESK: torrefazioni caffè
- ZAF / ZAF MAX: affumicatori
- ZTGL / ZTGL MAX / ZTGL MAX ULTRA: taglio laser
- Z MAX: soluzione universale grande portata

Regole CRITICHE di stile:
- Rispondi SEMPRE in italiano
- Sii MOLTO breve e conciso: massimo 2-3 frasi per risposta
- Vai dritto al punto, niente introduzioni lunghe
- Suggerisci il modello adatto in una frase
- Non fare elenchi lunghi, usa frasi semplici
- Non inventare specifiche tecniche che non conosci
- Se non sei sicuro, invita a contattare l'ufficio tecnico
- Quando vuoi raccogliere i dati di contatto, scrivi ESATTAMENTE la frase "Lascia i tuoi dati" in una riga a sé stante. Non chiedere i dati nel testo, usa solo questa frase trigger.
- IMPORTANTE: Se ricevi l'indicazione che i dati del cliente sono già stati raccolti, NON chiedere mai più i dati. Non scrivere "Lascia i tuoi dati" e non invitare a lasciare recapiti. Continua normalmente la consulenza tecnica.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Troppi messaggi, riprova tra qualche secondo." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Servizio temporaneamente non disponibile." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Errore del servizio AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Errore sconosciuto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
