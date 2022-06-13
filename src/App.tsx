import React, { useState } from 'react';

import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

function App() {
  const [showMode, setShowMode] = useState(0);

  return (
    <div className="App">
      <Header showAccountGallary = {(sm: number) => setShowMode(sm)}></Header>
      <Home showMode={showMode}></Home>
    </div>
  );
}

export default App;
