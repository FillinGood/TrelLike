import { createStore } from 'redux';
import { defaultStore } from './defaultStore';
import { reducer } from './reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export const store = createStore(reducer, defaultStore, devtools && devtools());
