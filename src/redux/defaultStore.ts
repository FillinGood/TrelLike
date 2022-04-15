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
      items: withItems(
        createCollection(),
        createItem(1),
        createItem(2),
        createItem(3),
        createItem(4),
        createItem(5)
        /*createItem(6),
        createItem(7),
        createItem(8),
        createItem(9),
        createItem(10),
        createItem(11),
        createItem(12),
        createItem(13),
        createItem(14),
        createItem(15),
        createItem(16),
        createItem(17),
        createItem(18),
        createItem(19),
        createItem(20)*/
      )
    }
  ])
};
