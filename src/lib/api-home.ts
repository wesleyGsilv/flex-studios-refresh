import { queryOptions } from "@tanstack/react-query";

export type HomeBannerItem = {
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem_desktop?: string;
  imagem_tablete?: string;
  imagem_celular?: { url?: string } | string;
};

export type HomeSala = { titulo: string; descricao: string };

export type HomeGaleriaFoto = { url: string; legenda?: string };

export type HomeCliente = { nome: string; logo: string };

export type HomeData = {
  sala_titulo: string;
  sala_subtitulo: string;
  sala_descricao: string;
  sala: HomeSala[];
  itens_banner: HomeBannerItem[];
  galeria_titulo: string;
  galeirs_ubtitulo: string;
  galeria_descricao: string;
  galeria_fotos: HomeGaleriaFoto[];
  clientes_itens: HomeCliente[];
  cliente_titulo: string;
  localidade_titulo: string;
  localidade_subtitulo: string;
  localidade_descricao: string;
  rota: string;
  mapa: string;
};

export type HomeResponse = {
  success: boolean;
  data: HomeData;
};

const HOME_URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/pages/home";

export async function fetchHomeData(): Promise<HomeData> {
  const res = await fetch(HOME_URL);
  if (!res.ok) throw new Error("Falha ao carregar dados da home");
  const json = (await res.json()) as HomeResponse;
  return json.data;
}

export const homeQueryOptions = queryOptions({
  queryKey: ["page", "home"],
  queryFn: fetchHomeData,
  staleTime: 1000 * 60 * 5,
});

/** Remove tags HTML e devolve texto puro. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
