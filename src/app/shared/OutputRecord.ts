export enum Type {
  TIME = 'TIME',
  STRING = 'STRINGS'
}

export interface OutputRecord {

  id: number;
  pinned: boolean;
  columnType: Type[];
  values: string[];
}
