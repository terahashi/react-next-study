///まとめ➡︎ブラウザで http://localhost:3000/ にアクセスしたとき
//1:まず main.jsx → App.jsx が読み込まれる
//2:App.jsx の中で <Routes> が URL に応じて <StudyHome /> をレンダリングする
//3:だから結果的に画面に出るのは pages/StudyHome.jsx の内容が表示される。

import { StrictMode } from 'react'; //ReactのStrictModeは「開発中に危険な書き方や非推奨な書き方を検出する」 こと。
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
