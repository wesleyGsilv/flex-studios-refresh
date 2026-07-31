import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { configQueryOptions, whatsappLink, type ConfigData } from "@/lib/api-config";

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export function useConfig(): ConfigData | undefined {
  const { data } = useQuery(configQueryOptions);
  const hydrated = useHydrated();
  return hydrated ? data : undefined;
}

export function useWhatsappLink(message: string): string {
  const config = useConfig();
  const phone = config?.whatsapp ?? "31986641213";
  return whatsappLink(phone, message);
}
