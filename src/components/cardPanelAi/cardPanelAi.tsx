import './cardPanelAi.css';
import { useState,useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { $aiAttackCard, $aiCards, $aiDefCards, $playerAttackCard, $playerDefCards, addAIBeatenCard, addAiDefCard, changeAIAttackCard, changeAICards, changePlayerCards, editDefAICards, editDefPlayerCards } from '../../store/cards';
import {useStore} from 'effector-react';
import { startDefAICards } from '../../store/cards';
import { $moveControl, startMove } from '../../store/move';
import { addPlayerPenaltyPoint } from '../../store/penaltypoints';

const CardPanelAi = () => {
  const aiCards = useStore($aiCards);
  const aiDefCards = useStore($aiDefCards);
  const playerAttackCard = useStore($playerAttackCard);
  const moveControl = useStore($moveControl);
  const [alertMessage, setAlertMessage] = useState('');
  const playerDefCards = useStore($playerDefCards);
  const aiAttackCard = useStore($aiAttackCard);
  const [warning,setWarning] = useState('');

  useEffect(()=>{
    startDefAICards(aiCards.slice(0,3));
    changeAICards(aiCards.slice(3));
  }, [])

  useEffect(() => {
    if(moveControl==='AI'){
      if(playerDefCards.length === 0){
        addPlayerPenaltyPoint()
        startMove('Player')
      }
      let length = aiDefCards.length;
      let addCardCount = 0;
      if (length<3){
        while(length<3){
          addAiDefCard(aiCards[addCardCount]);
          addCardCount++;
          length++;
        }
        changeAICards(aiCards.slice(addCardCount));
      }
      changeAIAttackCard(aiCards[0]);
      checkCanAiMove();
    }
  }, [moveControl])

  useEffect(()=>{
    if(moveControl==='AI' && playerDefCards){
      checkCanAiMove();
    }
    if(playerDefCards.length === 0 && moveControl){
      addPlayerPenaltyPoint()
      startMove('Player')
    }
  },[playerDefCards])
  const checkCanAiMove = () => {
    let check= false;

    for(let i = 0; i < playerDefCards.length; i++){
      if (playerDefCards[i]<aiCards[0])  check = true;
    }
    if (check){
      changeAICards(aiCards.slice(1))
      let minDifference = 5;
      let playerDefCardInAttackId =-1
      let length = playerDefCards.length;
      for(let i = 0; i<length; i++){
        if (aiCards[0] - playerDefCards[i]>0 && aiCards[0] - playerDefCards[i]<minDifference){
          playerDefCardInAttackId=i;
          minDifference=aiCards[0] - playerDefCards[i];
        }
      }
      editDefPlayerCards([...playerDefCards.slice(0,playerDefCardInAttackId),...playerDefCards.slice(playerDefCardInAttackId+1)])
      changeAICards([...aiCards.slice(2),playerDefCards[playerDefCardInAttackId]]) 
      changeAIAttackCard(aiCards[1])
          

    } 
    else {
      
      changeAIAttackCard(aiCards[0]);
      changeAICards([...aiCards.slice(1)])
      
      changePlayerCards([...aiCards,aiCards[0]]);
      setAlertMessage('Карты защиты сликом сильны')
      setTimeout(()=>{
        startMove('Player')
        setAlertMessage('')
      },3000)
    }
  }
  
  const playerAttackedCard = (id:number) =>{
    if (playerAttackCard>aiDefCards[id]) {
      addAIBeatenCard(aiDefCards[id])
      editDefAICards([...aiDefCards.slice(0,id),...aiDefCards.slice(id+1)])
    }
    else {
      setWarning('эта карта выше рангом')
      setTimeout(()=>{
        setWarning('')
      },1000)
    }
  }

  const defCards = aiDefCards ? aiDefCards.map((item, id:number) => {
    return(
      <div  onClick={() => playerAttackedCard(id)} key={id} className= 'Card_Panel_Defend__Ai'>{item}</div>
    );
  }) : null;

  return (
    <>
    <div className='Card_Panel_Ai'>
    {alertMessage && <Alert severity="error">{alertMessage}!</Alert>}
      {defCards}
    </div>
      {warning && <Alert severity="error">{warning}!</Alert>}
    </>
  )
}
export default CardPanelAi;




