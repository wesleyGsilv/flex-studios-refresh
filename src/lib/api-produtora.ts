import { queryOptions } from "@tanstack/react-query";
import type { DobraFormulario } from "./api-home";

export type ProdutoraNumero = { valor: string; descricao: string };
export type ProdutoraAno = {
  ano: string;
  mes: string;
  titulo: string;
  descricao: string;
};
export type ProdutoraGaleriaItem = {
  url: string;
  alt?: string;
  caption?: string;
  title?: string;
};
export type ProdutoraDepoimento = {
  nome: string;
  descricao: string;
  depoimento: string;
};

export type ProdutoraData = {
  titulo_banner: string;
  descricao_banner: string;
  banner_desktop?: string | false;
  banner_tablete?: string | false;
  banner_celular?: string | false;
  descricao_sobre: string;
  imagem?: string;
  numeros: ProdutoraNumero[];
  titulo_linha: string;
  sub_titulo_linha: string;
  descricao_linha: string;
  ano_a_ano: ProdutoraAno[];
  itens_galeria: ProdutoraGaleriaItem[];
  titulo_da_galeria: string;
  subtitulo_da_galeria: string;
  descricao_galeria: string;
  item: ProdutoraDepoimento[];
};

export type ProdutoraPayload = {
  data: ProdutoraData;
  dobra_formulario: DobraFormulario[];
};

const URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/pages/a-produtora";

export async function fetchProdutoraData(): Promise<ProdutoraPayload> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Falha ao carregar dados da produtora");
  const json = await res.json();
  return {
    data: json.data,
    dobra_formulario: json.dobra_formulario ?? [],
  };
}

export const produtoraQueryOptions = queryOptions({
  queryKey: ["page", "a-produtora"],
  queryFn: fetchProdutoraData,
  staleTime: 1000 * 60 * 5,
});
