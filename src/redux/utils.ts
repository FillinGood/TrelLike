export function deepClone<T>(obj: T): T {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const copy: any[] = [];
      for (const value of obj) {
        copy.push(deepClone(value));
      }
      return copy as unknown as T;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const copy: any = {};
      for (const key in obj) {
        copy[key] = deepClone(obj[key]);
      }
      return copy;
    }
  }
  return obj;
}

export type CollectionKey = string | number;

export interface Collection<K extends CollectionKey, I> {
  keys: K[];
  values: I[];
}

export function createCollection<K extends CollectionKey, I>(): Collection<K, I> {
  return { keys: [], values: [] };
}

export function addItem<K extends CollectionKey, I>(
  c: Collection<K, I>,
  key: K,
  item: I,
  index?: number
) {
  if (index === undefined) {
    c.keys.push(key);
    c.values.push(item);
  } else {
    c.keys.splice(index, 0, key);
    c.values.splice(index, 0, item);
  }
}

export function withItem<K extends CollectionKey, I>(
  c: Collection<K, I>,
  key: K,
  item: I
): Collection<K, I> {
  const copy = deepClone(c);
  addItem(copy, key, item);
  return copy;
}

export function withItems<K extends CollectionKey, I>(
  c: Collection<K, I>,
  ...pairs: [K, I][]
): Collection<K, I> {
  const copy = deepClone(c);
  for (const [key, item] of pairs) addItem(copy, key, item);
  return copy;
}

export function getItem<K extends CollectionKey, I>(c: Collection<K, I>, key: K) {
  const i = c.keys.findIndex((k) => k === key);
  if (i < 0) return null;
  return c.values[i];
}

export function removeItem<K extends CollectionKey, I>(c: Collection<K, I>, key: K) {
  const i = c.keys.findIndex((k) => k === key);
  if (i < 0) return;
  c.keys.splice(i, 1);
  c.values.splice(i, 1);
}

export function withoutItem<K extends CollectionKey, I>(c: Collection<K, I>, key: K) {
  const copy = deepClone(c);
  removeItem(copy, key);
  return copy;
}

export function getIndex<K extends CollectionKey, I>(c: Collection<K, I>, key: K) {
  return c.keys.findIndex((k) => k === key);
}

export function mapCollection<K extends CollectionKey, I, T>(
  c: Collection<K, I>,
  f: (item: I, key: K, coll: Collection<K, I>) => T
) {
  return c.keys.map((k, i) => f(c.values[i], k, c));
}

const counters = {
  column: 1,
  columnItem: 1
};

export function nextColumnId() {
  return counters.column++;
}

export function nextColumnItemId() {
  return counters.columnItem++;
}
