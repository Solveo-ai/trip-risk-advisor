import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BREVO_API = "https://api.brevo.com/v3";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY_MEDICAL_COST");
  if (!BREVO_API_KEY) {
    return new Response(JSON.stringify({ error: "BREVO_API_KEY_MEDICAL_COST not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const BREVO_LIST_ID = Deno.env.get("BREVO_LIST_ID_MEDICAL_COST");
  if (!BREVO_LIST_ID) {
    return new Response(JSON.stringify({ error: "BREVO_LIST_ID_MEDICAL_COST not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const listId = parseInt(BREVO_LIST_ID, 10);

  try {
    const body = await req.json();
    const { email } = body;

    const params = {
      destination: body.destination,
      region: body.region,
      averageCost: body.averageCost,
      rank: body.rank,
      worstCase: body.worstCase,
      incident1: body.incident1,
      incident2: body.incident2,
      incident3: body.incident3,
      incident4: body.incident4,
      incident5: body.incident5,
      medicalCost1Label: body.medicalCost1Label,
      medicalCost1Value: body.medicalCost1Value,
      medicalCost2Label: body.medicalCost2Label,
      medicalCost2Value: body.medicalCost2Value,
      medicalCost3Label: body.medicalCost3Label,
      medicalCost3Value: body.medicalCost3Value,
      medicalCost4Label: body.medicalCost4Label,
      medicalCost4Value: body.medicalCost4Value,
      medicalCost5Label: body.medicalCost5Label,
      medicalCost5Value: body.medicalCost5Value,
      medicalCost6Label: body.medicalCost6Label,
      medicalCost6Value: body.medicalCost6Value,
      medicalCost7Label: body.medicalCost7Label,
      medicalCost7Value: body.medicalCost7Value,
      medicalCost8Label: body.medicalCost8Label,
      medicalCost8Value: body.medicalCost8Value,
      highestMedicalCostLabel: body.highestMedicalCostLabel,
      highestMedicalCostValue: body.highestMedicalCostValue,
    };

    // Validate email
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const brevoHeaders = {
      "api-key": BREVO_API_KEY,
      "Content-Type": "application/json",
    };

    // 1. Create or update contact and add to list
    const contactRes = await fetch(`${BREVO_API}/contacts`, {
      method: "POST",
      headers: brevoHeaders,
      body: JSON.stringify({
        email,
        attributes: params,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!contactRes.ok) {
      const contactErr = await contactRes.text();
      console.error(`Brevo contact create/update failed [${contactRes.status}]:`, contactErr);
      // duplicate_parameter means contact exists — still ok, we update below if needed
      if (contactRes.status !== 400 || !contactErr.includes("duplicate_parameter")) {
        return new Response(JSON.stringify({ error: "Failed to create/update contact", detail: contactErr }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Contact exists — update attributes and list
      const updateRes = await fetch(`${BREVO_API}/contacts/${encodeURIComponent(email)}`, {
        method: "PUT",
        headers: brevoHeaders,
        body: JSON.stringify({
          attributes: params,
          listIds: [listId],
        }),
      });

      if (!updateRes.ok) {
        const updateErr = await updateRes.text();
        console.error(`Brevo contact update failed [${updateRes.status}]:`, updateErr);
        return new Response(JSON.stringify({ error: "Failed to update contact", detail: updateErr }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 2. Send transactional email
    const emailRes = await fetch(`${BREVO_API}/smtp/email`, {
      method: "POST",
      headers: brevoHeaders,
      body: JSON.stringify({
        templateId: 2,
        to: [{ email }],
        params,
      }),
    });

    if (!emailRes.ok) {
      const emailErr = await emailRes.text();
      console.error(`Brevo send email failed [${emailRes.status}]:`, emailErr);
      return new Response(JSON.stringify({ error: "Failed to send email", detail: emailErr }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
