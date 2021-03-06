import {
  AddColumnAction,
  AddItemAction,
  AnyAction,
  DelItemAction,
  EditItemAction,
  InsertItemAction
} from './actions';
import { loadStore, saveStore } from './defaultStore';
import { ColumnItemType, ColumnType, StoreState } from './types';
import {
  addItem,
  createCollection,
  deepClone,
  getItem,
  nextColumnId,
  nextColumnItemId,
  removeItem
} from './utils';

export function reducer(store: StoreState | undefined, action: AnyAction): StoreState {
  if (!store) return loadStore();
  const copy = deepClone(store);
  switch (action.type) {
    case 'ADD_ITEM':
      addItemReducer(copy, action);
      break;
    case 'DEL_ITEM':
      delItemReducer(copy, action);
      break;
    case 'INSERT_ITEM':
      insertItemReducer(copy, action);
      break;
    case 'EDIT_ITEM':
      editItemReducer(copy, action);
      break;
    case 'ADD_COLUMN':
      addColumnReducer(copy, action);
      break;
  }
  saveStore(copy);
  return copy;
}

function addItemReducer(store: StoreState, action: AddItemAction) {
  const column = getItem(store.columns, action.columnID);
  if (!column) return;
  const item: ColumnItemType = {
    columnID: column.id,
    id: nextColumnItemId(),
    value: action.value,
    description: ''
  };
  addItem(column.items, item.id, item);
}

function editItemReducer(store: StoreState, action: EditItemAction) {
  const column = getItem(store.columns, action.columnID);
  if (!column) return;
  const item = getItem(column.items, action.itemID);
  if (!item) return;
  if (action.value !== undefined) item.value = action.value;
  if (action.description !== undefined) item.description = action.description;
}

function delItemReducer(store: StoreState, action: DelItemAction) {
  const column = getItem(store.columns, action.columnID);
  if (!column) return;
  removeItem(column.items, action.itemID);
}

function insertItemReducer(store: StoreState, action: InsertItemAction) {
  const column = getItem(store.columns, action.columnID);
  if (!column) return;
  const item: ColumnItemType = {
    columnID: column.id,
    id: nextColumnItemId(),
    value: action.value,
    description: ''
  };
  addItem(column.items, item.id, item, action.index);
}

function addColumnReducer(store: StoreState, action: AddColumnAction) {
  const column: ColumnType = {
    id: nextColumnId(),
    name: action.name,
    items: createCollection()
  };
  addItem(store.columns, column.id, column);
}
