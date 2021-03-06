import { ColumnItemType, ColumnType, StoreState } from './types';
import { addItem, createCollection, nextColumnId, nextColumnItemId } from './utils';

interface StorageStore {
  columns: StorageColumn[];
}

interface StorageColumn {
  name: string;
  items: StorageColumnItem[];
}

interface StorageColumnItem {
  value: string;
  description: string;
}

function defaultStore(): StoreState {
  return {
    columns: createCollection()
  };
}

export function loadStore() {
  const json = localStorage.getItem('store');
  if (!json) return defaultStore();
  const parsed = JSON.parse(json) as StorageStore;
  const store: StoreState = { columns: createCollection() };
  for (const col of parsed.columns) {
    const column: ColumnType = {
      id: nextColumnId(),
      name: col.name,
      items: createCollection()
    };
    for (const i of col.items) {
      const item: ColumnItemType = {
        columnID: column.id,
        id: nextColumnItemId(),
        value: i.value,
        description: i.description
      };
      addItem(column.items, item.id, item);
    }
    addItem(store.columns, column.id, column);
  }
  return store;
}

export function saveStore(store: StoreState) {
  const storage: StorageStore = {
    columns: []
  };
  for (const col of store.columns.values) {
    const column: StorageColumn = {
      name: col.name,
      items: []
    };
    for (const i of col.items.values) {
      const item: StorageColumnItem = { value: i.value, description: i.description };
      column.items.push(item);
    }
    storage.columns.push(column);
  }
  const json = JSON.stringify(storage);
  localStorage.setItem('store', json);
}
