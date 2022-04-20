export interface BaseAction {
  type: string;
}
export type AnyAction =
  | AddItemAction
  | DelItemAction
  | InsertItemAction
  | AddColumnAction;

export interface AddItemAction extends BaseAction {
  type: 'ADD_ITEM';
  columnID: number;
  value: string;
}

export interface DelItemAction extends BaseAction {
  type: 'DEL_ITEM';
  columnID: number;
  itemID: number;
}

export interface InsertItemAction extends BaseAction {
  type: 'INSERT_ITEM';
  columnID: number;
  value: string;
  index: number;
}

export interface AddColumnAction extends BaseAction {
  type: 'ADD_COLUMN';
  name: string;
}

export function AddItemAction(columnID: number, value: string) {
  return <AddItemAction>{ type: 'ADD_ITEM', columnID, value };
}

export function DelItemAction(columnID: number, itemID: number) {
  return <DelItemAction>{ type: 'DEL_ITEM', columnID, itemID };
}

export function InsertItemAction(columnID: number, value: string, index: number) {
  return <InsertItemAction>{ type: 'INSERT_ITEM', columnID, value, index };
}

export function AddColumnAction(name: string) {
  return <AddColumnAction>{ type: 'ADD_COLUMN', name };
}
