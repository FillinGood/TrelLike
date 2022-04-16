import { AddItemAction, AnyAction } from './actions';
import { loadStore, saveStore } from './defaultStore';
import { ColumnItemType, StoreState } from './types';
import { addItem, deepClone, getItem, nextColumnItemId } from './utils';

export function reducer(store: StoreState | undefined, action: AnyAction): StoreState {
  if (!store) return loadStore();
  const copy = deepClone(store);
  switch (action.type) {
    case 'ADD_ITEM':
      addItemReducer(copy, action);
      break;
  }
  saveStore(copy);
  return copy;
}

function addItemReducer(store: StoreState, action: AddItemAction) {
  const column = getItem(store.columns, action.columnID);
  if (!column) return;
  const item: ColumnItemType = {
    id: nextColumnItemId(),
    value: action.value
  };
  addItem(column.items, item.id, item);
}
