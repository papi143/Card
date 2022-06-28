import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { $aiDefCards, $playerDefCards } from "../../store/cards";
import { $aiPenaltyPoints, $playerPenaltyPoints } from "../../store/penaltypoints";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Modal from "../modal/modal";
import { $moveControl } from "../../store/move";

const  GameOver = () => {

  const aiPenaltyPoints=useStore($aiPenaltyPoints);
  const playerPenaltyPoints=useStore($playerPenaltyPoints);
  const aiDefCards = useStore($aiDefCards);
  const playerDefCards = useStore($playerDefCards);
  const [message,setMessage] = useState('');
  const moveControl = useStore($moveControl);
  const [modal,setModal] = useState(false)

  useEffect(() => {
    if (aiPenaltyPoints>0) setMessage('ИИ получил штрафное очко, ВЫ ПОБЕДИЛИ!')
    if (playerPenaltyPoints>0) setMessage('Вы получили  штрафное очко ,ИИ ПОБЕДИЛ!')
  }, [aiPenaltyPoints,playerPenaltyPoints])
  

  useEffect(() => {
    if (playerDefCards.length===3 && aiDefCards.length===3) checkHaveMove()
  }, [moveControl])

  const checkHaveMove = () => {
    let check = !(playerDefCards.includes(4) && aiDefCards.includes(4))
    if(!check) setMessage('Ничья')

  }
  
  useEffect(() =>{
    if (message.length) setModal(true);
    
  },[message])

  return(
    <Modal active={modal}>
      {message && <h4>{message}</h4>}
      <Link to="/">
        <Button variant="contained" color="success">Играть Заново!</Button>
      </Link>
    </Modal>
  )
}
export default GameOver;