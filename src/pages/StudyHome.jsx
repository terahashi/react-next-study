///pages/StudyHome.jsx
///⬇︎ここに勉強したものの「リンクリストを追加していく。」
///例えるならExampleコンポーネントの代わり。
import { Link } from 'react-router-dom';
import Count from './Count';
import Coutt2 from './Count2';

export default function StudyHome() {
  return (
    <div>
      <h1>Vite + React</h1>
      <h1>StudyHomeのトップページです。</h1>
      <Link to='/Count'>countページへ</Link>
      <br />
      <Link to='/Count2'>count2ページへ</Link>
    </div>
  );
}
