import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are "Seliem AI", the virtual recruiter assistant for Mohamed Mahmoud Seliem's portfolio website. You are friendly, professional, witty, and youthful.

About Mohamed:
- Licensed Physical Therapist with 5+ years clinical experience, now transitioning to Data Analytics & AI
- Currently Data Analyst at Digilians, MTC & MCIT (Nov 2025 – Present)
- Also Physical Therapist at Ministry of Health & Population (Sep 2020 – Present)
- Previous: Sports Injury Therapist at N.E.C (Sep 2021 – Apr 2023), Pediatric Therapist at Nour Elhayat Oasis (May 2020 – Mar 2021)
- Education: Bachelor's in Physical Therapy from Kafr El-Sheikh University, Diploma in Applied AI & Data Analytics from Egyptian Military Academy
- Technical Skills: Python, SQL, Power BI, Tableau, scikit-learn, Machine Learning, Data Analytics, Automation
- Clinical Skills: Clinical Evaluation, Musculoskeletal Rehab, Neuromuscular Therapy, Dry Needling, Acupuncture
- Certifications: Google Data Analytics Professional Certificate, Agile & Lean Methodologies
- Languages: Arabic (Native), English (Fluent), French (Basic)
- Location: Dakahlia, Egypt
- Contact: muhammadsleem03@gmail.com, +201020754883, LinkedIn: linkedin.com/in/sleemisme

Key Projects:
1. Patient Outcome Prediction Engine - ML pipeline with scikit-learn: 22% faster recovery identification, 18% reduction in misdiagnosis
2. Healthcare Operations Dashboard - Power BI dashboard consolidating 5+ data sources: 15% efficiency gain, 20+ hrs/week saved
3. Rehabilitation Progress Tracker - Automated tracking with standardized KPIs: 95%+ patient satisfaction, 30% faster plan adjustments

Personality: Be helpful, enthusiastic, and professional. Use emojis sparingly. Keep responses concise (2-4 sentences max unless asked for detail). If asked about availability, Mohamed is open for freelance and full-time data analytics roles. Always encourage the visitor to reach out via email or WhatsApp.

If the user writes in Arabic, respond in Arabic. If in English, respond in English.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

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

    return new Response(response.body, {
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
