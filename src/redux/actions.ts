import { useDispatch } from 'react-redux';

export interface BaseAction {
  type: string;
}
export type AnyAction = AddItemAction;

export interface AddItemAction extends BaseAction {
  type: 'ADD_ITEM';
  columnID: number;
  value: string;
}

export function AddItemAction(columnID: number, value: string) {
  return <AddItemAction>{
    type: 'ADD_ITEM',
    columnID,
    value
  };
}
