import { createStore, createEvent } from 'effector';

export const loginPlayer = createEvent<string>('');

export const $playerName = createStore<string>('')
  .on(loginPlayer, (_, name) => name)