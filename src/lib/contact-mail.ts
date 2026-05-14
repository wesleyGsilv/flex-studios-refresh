import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";


export const contactMailSchema = z.object({
    nome: z.string().trim().min(1, "Informe o nome."),
    sobrenome: z.string().trim().min(1, "Informe o sobrenome."),
    email: z.union([z.literal(""), z.string().trim().email("Informe um e-mail valido.")]),
    celular: z
        .string()
        .trim()
        .refine((value) => {
            const digits = value.replace(/\D/g, "");
            return digits.length >= 10 && digits.length <= 11;
        }, "Informe um celular valido."),
    mensagem: z.string().trim().max(4000, "Mensagem muito longa.").default(""),
});

export type ContactMailInput = z.infer<typeof contactMailSchema>;

function requireEnv(name: string) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }

    return value;
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function nl2br(value: string) {
    return escapeHtml(value).replaceAll("\n", "<br />");
}

export const sendContactEmail = createServerFn({ method: "POST" })
    .inputValidator((data: unknown) => contactMailSchema.parse(data))
    .handler(async ({ data }) => {
        const gmailUser = requireEnv("GMAIL_USER");
        const gmailAppPassword = requireEnv("GMAIL_APP_PASSWORD");
        const recipient = process.env.CONTACT_FORM_TO ?? gmailUser;
        const senderName = `${data.nome} ${data.sobrenome}`.trim();
        const replyTo = data.email || gmailUser;
        const { default: nodemailer } = await import("nodemailer");

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: gmailUser,
                pass: gmailAppPassword,
            },
        });

        await transporter.sendMail({
            from: `"Flex Studios Site" <${gmailUser}>`,
            to: recipient,
            replyTo,
            subject: `[Contato Site]  - ${senderName}`,
            text: [
                `Nome: ${senderName}`,
                `Celular: ${data.celular}`,
                `E-mail: ${data.email || "Nao informado"}`,
                "Mensagem:",
                data.mensagem || "Nao informada",
            ].join("\n"),
            html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">Novo contato pelo site</h2>
          <p><strong>Nome:</strong> ${escapeHtml(senderName)}</p>
          <p><strong>Celular:</strong> ${escapeHtml(data.celular)}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(data.email || "Nao informado")}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${nl2br(data.mensagem || "Nao informada")}</p>
        </div>
      `,
        });

        return { success: true };
    });