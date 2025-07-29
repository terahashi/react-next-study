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
      <br></br>
      <Link to={'study/ObjectState'}>オブジェクトのステートを更新しよう</Link>
      <br></br>
      <Link to={'study/ListKey'}>リストに「Key」を設定しよう</Link>
      <br></br>
      <Link to={'study/Filter'}>配列のフィルターメソッドの使い方</Link>
      <br></br>
      <Link to={'study/Filter2'}>配列のフィルターメソッドの使い方2</Link>
      <br></br>
      <Link to={'study/ConditionalBranch'}>条件分岐を設ける(if文、&&(論理AND演算子)、??(Null合体演算子)、３項演算子)</Link>
    </div>
  );
};

export default StudyHome;
