import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import CardGamePage from '../../pages/cardGamePage';
import LoginPage from '../../pages/loginPage';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/game" element={<CardGamePage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
