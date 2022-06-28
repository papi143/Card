import { createStore, createEvent } from 'effector';

export const getPlayerCards = createEvent();
export const changePlayerCards = createEvent<number[]>()
export const addAIBeatenCard = createEvent<number>()

export const $playerCards = createStore<number[]>([])
  .on(getPlayerCards , () => {
    return [...[0,0,1,1,1,2,2,3,3,3].sort(()=>Math.random()-0.5),...[0,0,1,2,2,3,4,4,4,4].sort(()=>Math.random()-0.5)]
  })
  .on(changePlayerCards, (_,cards) => cards)
  .on(addAIBeatenCard, (playerCards,card) => [...playerCards,card])



export const changePlayerAttackCard = createEvent<number>()  

export const $playerAttackCard = createStore<number>(-1)
  .on(changePlayerAttackCard, (_,card) => card)


export const getAiCards = createEvent();
export const changeAICards = createEvent<number[]>()
export const addPlayerAttackCard = createEvent<number>()

export const $aiCards = createStore<number[]>([])
  .on(getAiCards, () => {
    return [...[0,0,1,1,1,2,2,3,3,3].sort(()=>Math.random()-0.5),...[0,0,1,2,2,3,4,4,4,4].sort(()=>Math.random()-0.5)]
  })
  .on(changeAICards, (_, cards) => cards)
  .on(addPlayerAttackCard, (aiCards,card) => [...aiCards,card])


export const changeAIAttackCard = createEvent<number>()  

export const $aiAttackCard = createStore<number>(-1)
  .on(changeAIAttackCard, (_,card) => card)




export const startDefAICards = createEvent<number[]>()
export const editDefAICards = createEvent<number[]>()
export const addAiDefCard = createEvent<number>();

export const $aiDefCards = createStore<number[]>([])
  .on(startDefAICards, (_,cards) => cards)
  .on(editDefAICards, (_,cards) => cards)
  .on(addAiDefCard, (aiDefCards,card) =>  [...aiDefCards,card]);


export const startDefPlayerCards = createEvent<number[]>()
export const editDefPlayerCards = createEvent<number[]>()
export const addPlayerDefCard = createEvent<number>()

export const $playerDefCards = createStore<number[]>([])
    .on(startDefPlayerCards, (_,cards) => cards)
    .on(editDefPlayerCards, (_,cards) => cards)
    .on(addPlayerDefCard, (playerDefCards,card) =>  [...playerDefCards,card]);






