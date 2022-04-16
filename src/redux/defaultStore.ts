import { ColumnItemType, StoreState } from './types';
import { createCollection, withItems } from './utils';

function createItem(n: number): [number, ColumnItemType] {
  return [n, { id: n, value: `item${n}` }];
}

export const defaultStore: StoreState = {
  columns: withItems(createCollection(), [
    1,
    {
      id: 1,
      name: 'column',
      items: createCollection()
    }
  ])
};
