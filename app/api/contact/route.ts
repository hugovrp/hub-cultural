import { NextResponse } from "next/server";
import { z } from "zod";
import emailjs from "@emailjs/nodejs";

export const runtime = "nodejs";

const contactSchema = z.object({
  user_name: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[A-Za-zÀ-ÿ\s]+$/),

  user_email: z
    .string()
    .email()
    .max(120),

  message: z
    .string()
    .min(10)
    .max(1000),

  token: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = contactSchema.parse(body);

    // Validar TURNSTILE
    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: validatedData.token,
        }),
      }
    );

    const verifyData = await verifyResponse.json();

    console.log("TURNSTILE RESPONSE:", verifyData);

    if (!verifyData.success) {
      return NextResponse.json(
        {
          success: false,
          error: JSON.stringify(verifyData),
        },
        {
          status: 400,
        }
      );
    }

    // Sanitização
    const cleanData = {
      user_name: validatedData.user_name.trim(),
      user_email: validatedData.user_email.trim(),
      message: validatedData.message.trim(),
    };

    console.log("EMAILJS_SERVICE_ID", process.env.EMAILJS_SERVICE_ID);
    console.log("EMAILJS_TEMPLATE_ID", process.env.EMAILJS_TEMPLATE_ID);

    // Envio
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      cleanData,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error("ERRO COMPLETO:", error);

    return NextResponse.json(
      {
        success: false,
        error: JSON.stringify(error, null, 2),
      },
      { status: 400 }
    );
  }
}