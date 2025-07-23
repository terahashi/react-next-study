///pages/StudyHome.jsx
///⬇︎勉強したものの「リンクリストを追加していく。」
import { Link } from 'react-router-dom';

const StudyHome = () => {
  return (
    <div>
      <h1>Vite + React</h1>
      <h1>StudyHomeのトップページです。</h1>
      <Link to='study/Count'>countの勉強ページ</Link>
      <br></br>
      <Link to='study/Count2'>count2の勉強ページ</Link>
      <br></br>
      <Link to='study/EventExample'>イベントリスナーの勉強ページ</Link>
      <br></br>
      <Link to={'study/EventExample2'}>イベントリスナーの勉強ページ2</Link>
    </div>
  );
};

export default StudyHome;
