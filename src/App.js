import React from 'react';
import './App.css';
import DailyTime from './DailyTime';

function App() {
  return (
    <div style={{padding:50}}>
      <DailyTime onchange={(data) => { console.log(data) }} />
    </div>

  );
}

export default App;
