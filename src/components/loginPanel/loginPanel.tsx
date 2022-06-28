import './loginPanel.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom' 
import { getAiCards, getPlayerCards } from '../../store/cards';
import { loginPlayer } from '../../store/loginPanel';
import { resetPenaltyPoints } from '../../store/penaltypoints';

const LoginPanel = () => {

  const [name, setName] = useState('')

  const loadCards = () => {
    loginPlayer(name);
    getPlayerCards();
    getAiCards();
    resetPenaltyPoints();
  }
  useEffect(()=>{
    loadCards();
  })
  const loginBtn = name.length ? 
  (<Link to="/game">
    <Button onClick={()=>loadCards()} sx={{ marginTop: 5 }} variant="contained" color="success">
      Войти
    </Button>
  </Link>) :
  <Button sx={{ marginTop: 5 }} disabled variant="contained" color="success">Войти</Button>

   return(
    <div>
      <h1>Регистрация</h1>
      <TextField 
        id="outlined-basic"
        label="Имя"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
       {loginBtn}
      </div>
    </div>
   )
}
export default LoginPanel