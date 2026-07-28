import { queryOptions } from "@tanstack/react-query";

export type ConfigRede = { icone: string; link: string };

export type ConfigData = {
  whatsapp: string;
  telefone: string;
  email: string;
  rede: ConfigRede[];
  logo_cabecalho: string;
  logo_roda_pe: string;
  descricao_roda_pe: string;
};

export type ConfigResponse = {
  success: boolean;
  data: ConfigData;
};

const CONFIG_URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/pages/configuracao";

const STORAGE_KEY = "flex:config:v1";
const STORAGE_TTL = 1000 * 60 * 60 * 6; // 6h

type Cached = { savedAt: number; data: ConfigData };

function readCache(): ConfigData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (!parsed?.data) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: ConfigData) {
  if (typeof window === "undefined") return;
  try {
    const payload: Cached = { savedAt: Date.now(), data };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

function isFresh(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as Cached;
    return Date.now() - (parsed.savedAt ?? 0) < STORAGE_TTL;
  } catch {
    return false;
  }
}

export async function fetchConfigData(): Promise<ConfigData> {
  const cached = readCache();
  if (cached && isFresh()) return cached;

  try {
    const res = await fetch(CONFIG_URL);
    if (!res.ok) throw new Error("Falha ao carregar configuração");
    const json = (await res.json()) as ConfigResponse;
    writeCache(json.data);
    return json.data;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}

export const configQueryOptions = queryOptions({
  queryKey: ["config", "site"],
  queryFn: fetchConfigData,
  staleTime: STORAGE_TTL,
  gcTime: STORAGE_TTL,
  initialData: () => readCache() ?? undefined,
});

/** Retorna apenas os dígitos do telefone (formato E.164 sem +). */
export function digitsOnly(value: string): string {
  return (value ?? "").replace(/\D/g, "");
}

/** Monta uma URL wa.me com o número do WhatsApp e a mensagem. */
export function whatsappLink(phone: string, message: string): string {
  const digits = digitsOnly(phone);
  const finalDigits = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${finalDigits}?text=${encodeURIComponent(message)}`;
}
