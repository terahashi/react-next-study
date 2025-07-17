// Count.jsxのような「カウント機能を持つ単独ウェブページ」は「pages/」に入れる。
import { useState } from 'react';

//⬇︎Countコンポーネント
const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h3>カウント機能 No1</h3>
      <p>カウント機能を持つ単独ページを作成しよう</p>
      <br></br>
      <CountResult title='カウント' count={count} />
      <CountUpdate setCount={setCount} />
    </>
  );
};

//CountUpdateとcountDownイベント
const CountUpdate = ({ setCount }) => {
  const countUp = () => {
    // countに1プラス
    setCount((prev) => prev + 1);
  };
  const countDown = () => {
    // countから1マイナス
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

//⬇︎CountResultコンポーネントで結果を表示
const CountResult = ({ title, count }) => (
  <h3>
    {title}:{count}
  </h3>
);

export default Count;
