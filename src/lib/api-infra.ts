import { queryOptions } from "@tanstack/react-query";
import type { DobraFormulario, HomeBannerItem } from "./api-home";

export type InfraDiferencial = { descricao: string };
export type InfraEquipamento = { equipamento: string };
export type InfraCategoria = {
  titulo: string;
  equipamentos: InfraEquipamento[] | false;
};
export type InfraFoto = { url: string; title?: string; alt?: string };

export type InfraestruturaData = {
  itens_banner: HomeBannerItem[];
  descricao_diferenciais: string;
  conteudo: InfraDiferencial[];
  item: InfraCategoria[];
  fotos: InfraFoto[];
};

export type InfraestruturaPayload = {
  data: InfraestruturaData;
  dobra_formulario: DobraFormulario[];
};

const URL =
  "https://www.flex.apigwrconstruct.com.br/wp-json/api-flex/v1/pages/infraestrutura";

export async function fetchInfraestruturaData(): Promise<InfraestruturaPayload> {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Falha ao carregar dados de infraestrutura");
  const json = await res.json();
  return {
    data: json.data,
    dobra_formulario: json.dobra_formulario ?? [],
  };
}

export const infraestruturaQueryOptions = queryOptions({
  queryKey: ["page", "infraestrutura"],
  queryFn: fetchInfraestruturaData,
  staleTime: 1000 * 60 * 5,
});
