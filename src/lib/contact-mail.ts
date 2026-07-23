import { z } from "zod";

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

const CONTACT_URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/contact";

export type ContactApiResponse = {
  success: boolean;
  message?: string;
  cf7_status?: string;
  diagnostic?: string;
  hint?: string;
  data?: unknown;
};

export async function sendContactEmail(input: ContactMailInput): Promise<ContactApiResponse> {
  const payload = contactMailSchema.parse(input);
  const body = {
    "first-name": payload.nome,
    "last-name": payload.sobrenome,
    "your-email": payload.email,
    "your-phone": payload.celular,
    "your-message": payload.mensagem,
  };

  const res = await fetch(CONTACT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  let json: ContactApiResponse | null = null;
  try {
    json = (await res.json()) as ContactApiResponse;
  } catch {
    json = null;
  }

  if (!res.ok || !json?.success) {
    const message =
      json?.message || `Falha ao enviar mensagem (HTTP ${res.status}).`;
    const err = new Error(message) as Error & { response?: ContactApiResponse };
    err.response = json ?? undefined;
    throw err;
  }

  return json;
}
