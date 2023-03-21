import React, { useState } from 'react'
import './App.css';

function App() {
  const handleClick = async () => {
    const data = await fetch('/products/list')
    const json = await data.json()
    console.log(json)
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Get liste</button>

    </div>
  );
}

export default App;
