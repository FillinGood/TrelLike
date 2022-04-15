import { AnyAction } from './actions';
import { defaultStore } from './defaultStore';
import { StoreState } from './types';

export function reducer(store: StoreState | undefined, action: AnyAction): StoreState {
  if (!store) return defaultStore;

  return store;
}
