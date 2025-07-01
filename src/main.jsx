//1:多くのプロジェクトではmain.jsxがスタートです。
//2:次にApp.jsxを読み込む。App.jsx は、全ページの親（ルート）です。
//3:「pagesのHome.jsx(トップページを読み込む)」設定を追加します。

///まとめ:ブラウザで http://localhost:3000/ にアクセスしたとき
//1:まず main.jsx → App.jsx が読み込まれる
//2:App.jsx の中で <Routes> が URL に応じて <Home /> をレンダリングする
//3:だから結果的に画面に出るのは pages/Home.jsx の内容が表示される。

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
