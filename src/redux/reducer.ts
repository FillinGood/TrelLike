import { AnyAction } from './actions';
import { defaultStore } from './defaultStore';
import { StoreState } from './store';

export function reducer(
  store: StoreState | undefined,
  action: AnyAction
): StoreState {
  if (!store) return defaultStore;

  return store;
}
