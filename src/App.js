import React from 'react';
import './App.css';
import DailyTime from './DailyTime';

function App() {
  return (
    <DailyTime lang="es" onchange={(data)=>{console.log(data)}}/>
  );
}

export default App;
