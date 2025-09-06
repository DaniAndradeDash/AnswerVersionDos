import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { nombre, email, telefono, empresa, mensaje } = await req.json();

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
        port: Number(process.env.SMTP_PORT) || 2525,
        auth: {
            user: process.env.MAILTRAP_USER!,
            pass: process.env.MAILTRAP_PASS!,
        },
        secure: false, // add this line for SMTP transport
    } as nodemailer.TransportOptions);

    try {
        await transporter.sendMail({
            from: `"${nombre}" <${email}>`,
            to: process.env.EMAILJS_USER || "daniandrademty@gmail.com",
            subject: `Nuevo mensaje de ${nombre}`,
            html: `
            <h2>Mensaje desde el sitio web</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono}</p>
            <p><strong>Empresa:</strong> ${empresa}</p>
            <p><strong>Mensaje:</strong><br/>${mensaje}</p>
        `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al enviar correo:", error);
        return NextResponse.json({ success: false });
    }
}