import {createStore,createEvent} from 'effector';

export const addPlayerPenaltyPoint = createEvent()
export const resetPenaltyPoints = createEvent()

export const $playerPenaltyPoints = createStore<number>(0)
  .on(addPlayerPenaltyPoint, (playerPenaltyPoints) => playerPenaltyPoints+1)
  .on(resetPenaltyPoints, () => 0)

  export const addAiPenaltyPoint = createEvent()

  export const $aiPenaltyPoints = createStore<number>(0)
    .on(addAiPenaltyPoint, (aiPenaltyPoints) => aiPenaltyPoints+1)
    .on(resetPenaltyPoints, () => 0)
