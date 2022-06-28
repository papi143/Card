import './cardPanelPlayer.css';
import { useState, useEffect, useRef } from 'react';
import Alert from '@mui/material/Alert';
import { $playerCards, $playerDefCards, changePlayerCards, startDefPlayerCards, $playerAttackCard, changePlayerAttackCard, $aiDefCards, addPlayerAttackCard, addPlayerDefCard, changeAICards, $aiCards } from '../../store/cards';
import { useStore } from 'effector-react';
import { $moveControl, startMove } from '../../store/move';
import { addAiPenaltyPoint } from '../../store/penaltypoints';

const CardPanelPlayer = () => {
  const playerCards = useStore($playerCards);
  const playerDefCards = useStore($playerDefCards);
  const moveControl = useStore($moveControl);
  const playerAttackCard = useStore($playerAttackCard);
  const aiDefCards = useStore($aiDefCards);
  const aiCards= useStore($aiCards);
  const [alertMessage, setAlertMessage] = useState('') 
  const [checkMovePossibility, setCheckMovePossibility] = useState(false)

  useEffect(()=>{
    startDefPlayerCards(playerCards.slice(0,3));
    changePlayerCards(playerCards.slice(3));
  }, [])

  useEffect(() => {
    if(moveControl === 'Player'){
      let length = playerDefCards.length;
      let addCardCount = 0;
      if (length<3){
        while(length<3){
          addPlayerDefCard(playerCards[addCardCount]);
          addCardCount++;
          length++;
        }
        changePlayerCards(playerCards.slice(addCardCount));
      }
      changePlayerAttackCard(playerCards[0]);
      changePlayerCards(playerCards.slice(1))
      checkCanPlayerMove()
    }
  },[moveControl])

  useEffect(() =>{
    if(moveControl === 'Player' && aiDefCards){
      changePlayerAttackCard(playerCards[0])
      checkCanPlayerMove()
    }
    if (aiDefCards.length===0 && moveControl) {
      addAiPenaltyPoint()
      startMove('AI')
    };
  }, [aiDefCards])

  const checkCanPlayerMove = () => {
    let check= false;
    for(let i = 0; i < aiDefCards.length; i++){
      if (aiDefCards[i]<playerCards[0])  check = true;
    }
    setCheckMovePossibility(check)
    if (check){
      changePlayerCards(playerCards.slice(1))
    } 
    else {
      changePlayerAttackCard(playerCards[0]);
      changePlayerCards([...playerCards.slice(1)])
      changeAICards([...aiCards,playerCards[0]]);
      setAlertMessage('Карты защиты сликом сильны')
      setTimeout(()=>{
        startMove('AI')
        setAlertMessage('')
      },3000)
    }
  }

  const defCards = playerDefCards ? playerDefCards.map((item, id) => {
    return(
      <div key={id} className= 'Card_Panel_Defend__Player'>{item}</div>
    );
  }) : null;

  const attackCard = (playerAttackCard !== -1) ? 
    <div className='Card_Panel__Attack'>{playerAttackCard}</div> : null;

  return(
    <>

      <div className='Card_Panel'>
        {defCards}
      </div>
      {alertMessage && <Alert severity="error">{alertMessage}!</Alert>}
     {attackCard}
    </>
  )
}
export default CardPanelPlayer;
