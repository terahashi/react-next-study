///pages/StudyHome.jsx
///⬇︎ここに勉強したものの「リンクリストを追加していく。」
///例えるならExampleコンポーネントの代わり。
import { Link } from 'react-router-dom';
import Count from './Count';

export default function StudyHome() {
  return (
    <div>
      <h1>StudyHomeのトップページです。</h1>
      <Link to='/Count'>countページへ移動</Link>
    </div>
  );
}
