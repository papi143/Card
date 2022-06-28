import CardPanelAi from "../components/cardPanelAi/cardPanelAi";
import CardPanelPlayer from "../components/cardPanelPlayer/cardPanelPlayer";
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { $moveControl, startMove } from "../store/move";
import { useStore } from 'effector-react';
import { $aiPenaltyPoints, $playerPenaltyPoints } from "../store/penaltypoints";
import { $playerName } from "../store/loginPanel";
import GameOver from "../components/gameOver/gameOver";

const CardGamePage = () => {
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const moveControl = useStore($moveControl);
  const aiPenaltyPoints = useStore($aiPenaltyPoints);
  const playerPenaltyPoints = useStore($playerPenaltyPoints);
  const playerName = useStore($playerName);

  const startGame = () => {
    setShowBtn(false);
    setShowLoading(true);
    setTimeout(()=>{
      setShowLoading(false);
      const rnd = Math.round(Math.random()+1)
      const move = rnd===1 ? 'Player': 'AI';
      startMove(move);
    },1500)
  }
  const showPlayerMove = (moveControl === 'Player')? <h3>Ваш Ход</h3> : null;
  const showAiMove = (moveControl === 'AI')? <h3>Ход ИИ</h3>: null;
  return (
    <>
    <CardPanelAi/>
    {showBtn && <Button onClick={() => startGame()}>Бросить жребий</Button>}
    <div>{showPlayerMove}</div>
    <br/>
    {showAiMove}
    {showLoading && <LoadingButton loading variant="outlined">Submit</LoadingButton>}
    <CardPanelPlayer />
    <div>
      <div>Количество штрафных очков ИИ - {aiPenaltyPoints}/1</div>
      <div>Количество штрафных очков {playerName}- {playerPenaltyPoints}/1</div>
    </div>
    
    <GameOver/>
    
    </>
    
  )
}
export default CardGamePage;