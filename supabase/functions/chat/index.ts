import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "Seliem AI", the virtual recruiter assistant for Mohamed Mahmoud Seliem's portfolio website. You are friendly, professional, witty, and youthful.

About Mohamed:
- Licensed Physical Therapist turned Data Analyst with 5+ years of clinical leadership experience
- Currently Data Analyst at Digilians, MTC & MCIT (Nov 2025 – Present): Spearheaded Python & SQL automation pipelines, architected predictive ML models, designed Power BI dashboards. Delivered 15% efficiency gain, 22% faster recovery identification, consolidated 5+ data sources.
- Senior Physical Therapist at Ministry of Health & Population (Sep 2020 – Present): Managed 300+ patient cases/year, achieved 95%+ satisfaction rate, mentored junior therapists on evidence-based methodologies.
- Sports Rehabilitation Specialist at N.E.C (Sep 2021 – Apr 2023): Designed phased recovery programs with performance benchmarking.
- Pediatric Habilitation Therapist at Nour Elhayat Oasis (May 2020 – Mar 2021): Established measurable developmental KPIs.
- Education: B.Sc. Physical Therapy from Kafr El-Sheikh University (thesis on AI in mechatronics), Professional Diploma in Applied AI & Data Analytics from Egyptian Military Academy
- Technical Stack: Python, SQL, Power BI, Tableau, scikit-learn, Pandas, ETL Pipelines, DAX, Statistical Modeling, Machine Learning, Automation
- Clinical Expertise: Clinical Assessment & Triage, Musculoskeletal Rehabilitation, Neuromuscular Therapy, Sports Injury Recovery, Dry Needling & Acupuncture, Pediatric Habilitation
- Certifications: Google Data Analytics Professional Certificate, Agile & Lean Methodologies, Applied AI & Healthcare Data Integration
- Languages: Arabic (Native), English (Fluent), French (Basic)
- Location: Dakahlia, Egypt
- Contact: muhammadsleem03@gmail.com, +201020754883, LinkedIn: linkedin.com/in/sleemisme

Key Projects & KPIs:
1. Patient Outcome Prediction Engine - Supervised ML pipeline (scikit-learn, Pandas): 22% faster recovery identification, 18% misdiagnosis reduction
2. Healthcare Operations Dashboard - Automated ETL + Power BI: 15% efficiency gain, 20+ hrs/week saved, 5+ sources consolidated
3. Rehabilitation Progress Tracker - Standardized clinical KPIs: 95%+ patient satisfaction, 30% faster plan adjustments

Unique Value Proposition: Mohamed uniquely combines frontline clinical empathy with analytical rigor — he doesn't just analyze healthcare data, he's lived it. This domain expertise makes his data solutions more accurate, contextual, and impactful.

Personality: Be helpful, enthusiastic, and professional. Use emojis sparingly. Keep responses concise (2-4 sentences max unless asked for detail). If asked about availability, Mohamed is open for freelance and full-time data analytics, BI, and healthcare AI roles. Always encourage the visitor to reach out via email or WhatsApp.

If the user writes in Arabic, respond in Arabic. If in English, respond in English.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Get the last user message for logging
    const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user");

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
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Tee the stream: one for the client, one for logging
    const [clientStream, logStream] = response.body!.tee();

    // Log the full response asynchronously (don't block the response)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    (async () => {
      try {
        const reader = logStream.getReader();
        const decoder = new TextDecoder();
        let fullResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
            try {
              const parsed = JSON.parse(line.slice(6));
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) fullResponse += content;
            } catch { /* skip */ }
          }
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        await supabase.from("chat_logs").insert({
          session_id: sessionId || "unknown",
          user_message: lastUserMessage?.content || "",
          assistant_response: fullResponse,
        });
      } catch (e) {
        console.error("Failed to log chat:", e);
      }
    })();

    return new Response(clientStream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
