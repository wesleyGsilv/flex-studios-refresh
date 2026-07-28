import { queryOptions } from "@tanstack/react-query";
import type { DobraFormulario } from "./api-home";

export type PlanoDiferencial = { item: string };

export type PlanoItem = {
  nome: string;
  titulo: string;
  descricao: string;
  opcao_destaque: boolean;
  valor_mensal: string;
  valor_avulso: string;
  diferenciais: PlanoDiferencial[] | false;
};

export type PlanosFaq = { pergunta: string; resposta: string };

export type PlanosBannerImage =
  | { url?: string; sizes?: Record<string, string> }
  | false
  | string;

export type PlanosData = {
  titulo_banner: string;
  subtitulo: string;
  descricao_banner: string;
  plano: PlanoItem[];
  banner_desktop?: PlanosBannerImage;
  banner_tablete?: PlanosBannerImage;
  banner_celular?: PlanosBannerImage;
  titulo: string;
  descricao: string;
  pergunta_e_resposta: PlanosFaq[];
};

export type PlanosPayload = {
  data: PlanosData;
  dobra_formulario: DobraFormulario[];
};

const URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/pages/planos";

export async function fetchPlanosData(): Promise<PlanosPayload> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Falha ao carregar dados dos planos");
  const json = await res.json();
  return { data: json.data, dobra_formulario: json.dobra_formulario ?? [] };
}

export const planosQueryOptions = queryOptions({
  queryKey: ["page", "planos"],
  queryFn: fetchPlanosData,
  staleTime: 1000 * 60 * 5,
});

export function getPlanosBannerImage(
  img: PlanosBannerImage | undefined
): string | undefined {
  if (!img) return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && "url" in img) return img.url;
  return undefined;
}
