import { useQuery } from "@tanstack/react-query";
import { configQueryOptions, whatsappLink, type ConfigData } from "@/lib/api-config";

export function useConfig(): ConfigData | undefined {
  const { data } = useQuery(configQueryOptions);
  return data;
}

export function useWhatsappLink(message: string): string {
  const config = useConfig();
  const phone = config?.whatsapp ?? "31986641213";
  return whatsappLink(phone, message);
}
