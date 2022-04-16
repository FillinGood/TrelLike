export interface BaseAction {
  type: string;
}
export type AnyAction = AddItemAction | AddColumnAction;

export interface AddItemAction extends BaseAction {
  type: 'ADD_ITEM';
  columnID: number;
  value: string;
}

export interface AddColumnAction extends BaseAction {
  type: 'ADD_COLUMN';
  name: string;
}

export function AddItemAction(columnID: number, value: string) {
  return <AddItemAction>{ type: 'ADD_ITEM', columnID, value };
}

export function AddColumnAction(name: string) {
  return <AddColumnAction>{ type: 'ADD_COLUMN', name };
}
