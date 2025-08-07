import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

//⬇︎自分で追加(2025/7/1)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudyHome from './pages/study/StudyHome';
import Count from './pages/study/Count';
import Count2 from './pages/study/Count2';
import EventExample from './pages/study/EventExample';
import EventExample2 from './pages/study/EvantExample2';
import ObjectState from './pages/study/ObjectState';
import ListKey from './pages/study/ListKey';
import Filter from './pages/study/Filter';
import Filter2 from './pages/study/Filter2';
import ConditionalBranch from './pages/study/ConditionalBranch';
import Refactor from './pages/study/Refactor';
import InputTextarea from './pages/study/InputTextarea';
import Radio from './pages/study/Radio';
import SingleCheckBox from './pages/study/SingleCheckBox';
import MultipleCheckBox from './pages/study/MultipleCheckBox';
import Select from './pages/study/Select';
import TodoApp from './pages/study/TodoApp';

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

      {/* <h1>Vite + React</h1> */}

      {/* <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div> */}

      {/* ⬇︎自分で追加(2025/7/1) */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudyHome />} /> {/*⬅︎StudyHomeトップページ */}
          <Route path='study/Count' element={<Count />} />
          <Route path='study/Count2' element={<Count2 />} />
          <Route path='study/EventExample' element={<EventExample />} />
          <Route path='study/EventExample2' element={<EventExample2 />} />
          <Route path='study/ObjectState' element={<ObjectState />} />
          <Route path='study/ListKey' element={<ListKey />} />
          <Route path='study/Filter' element={<Filter />} />
          <Route path='study/Filter2' element={<Filter2 />} />
          <Route path='study/ConditionalBranch' element={<ConditionalBranch />} />
          <Route path='study/Refactor' element={<Refactor />} />
          <Route path='study/InputTextarea' element={<InputTextarea />} />
          <Route path='study/Radio' element={<Radio />} />
          <Route path='study/SingleCheckBox' element={<SingleCheckBox />} />
          <Route path='study/MultipleCheckBox' element={<MultipleCheckBox />} />
          <Route path='study/Select' element={<Select />} />
          <Route path='study/TodoApp' element={<TodoApp />} />
          {/* <Route path='./pages/Count' element={<Count />} /> ⬅︎これだとエラー。【pathはURL】であってファイルの場所ではない！ */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
