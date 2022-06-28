import { createEvent,createStore } from 'effector';

export const startMove = createEvent<string>();

export const $moveControl = createStore<string>('')
  .on(startMove, (_,move) => move);


