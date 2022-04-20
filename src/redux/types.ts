import { Collection } from './utils';

export interface StoreState {
  columns: ColumnCollection;
}

export type ColumnCollection = Collection<number, ColumnType>;

export type ColumnItemCollection = Collection<number, ColumnItemType>;

export interface ColumnType {
  name: string;
  id: number;
  items: ColumnItemCollection;
}

export interface ColumnItemType {
  columnID: number;
  id: number;
  value: string;
}
