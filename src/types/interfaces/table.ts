export interface ISortState {
  column: string;
  order: string;
}

export interface IHeader {
  text: string;
  sort: boolean;
}

export interface ISearch {
  label: string;
  value: string;
}
