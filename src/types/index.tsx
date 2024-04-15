export type ILaboratoryData = ILaboratory[];

export interface ILaboratory {
  id: number;
  nome: string;
}

export type IPropertiesData = IProperties[];

export interface IProperties {
  id: number;
  nome: string;
  cnpj: string;
}
