import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

//⬇︎自分で追加(2025/7/1)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudyHome from './pages/StudyHome';
import Count from './pages/Count';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div> */}
      <h1>Vite + React</h1>

      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>

      {/* ⬇︎自分で追加(2025/7/1) */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudyHome />} />
          {/* <Route path='./pages/Count' element={<Count />} /> ⬅︎これだとエラー。【pathはURL】であってファイルの場所ではない！ */}
          <Route path='/Count' element={<Count />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
