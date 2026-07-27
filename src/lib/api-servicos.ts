import { queryOptions } from "@tanstack/react-query";
import type { DobraFormulario, HomeBannerItem } from "./api-home";

export type ServicoItem = { titulo: string; descricao: string };

export type ServicoProjeto = {
  nome: string;
  descricao: string;
  thumbnail: string;
  link_do_video: string;
};

export type ServicosData = {
  itens_banner: HomeBannerItem[];
  itens: ServicoItem[];
  titulo: string;
  subtitulo: string;
  descricao: string;
  projetos: ServicoProjeto[];
  link_do_canal_youtube: string;
};

export type ServicosPayload = {
  data: ServicosData;
  dobra_formulario: DobraFormulario[];
};

const URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/pages/servicos";

export async function fetchServicosData(): Promise<ServicosPayload> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Falha ao carregar dados de serviços");
  const json = await res.json();
  return { data: json.data, dobra_formulario: json.dobra_formulario ?? [] };
}

export const servicosQueryOptions = queryOptions({
  queryKey: ["page", "servicos"],
  queryFn: fetchServicosData,
  staleTime: 1000 * 60 * 5,
});

/** Extrai o ID de um vídeo do YouTube a partir de qualquer URL comum. */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?[^#]*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}
