import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400 }
      );
    }

    // Send to Brevo
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": import.meta.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(import.meta.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error("Brevo error:", errorText);

      return new Response(
        JSON.stringify({ error: "Failed to subscribe" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);

    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
};