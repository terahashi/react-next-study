//メモ20250716「57. ステートを複数のコンポーネントで管理しよう！」
//コンポーネントが消滅した後も値を保持する方法を学ぶ。

import { useState } from 'react';

//⬇︎Exampleコンポーネント
const Example = () => {
  const [toggle, setToggle] = useState(true);
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const toggleComponent = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleComponent}>ボタンを押すとA,B切り替わり</button>
      {/* ⬇︎Count2コンポーネントをここで実行。順序通りにJSXをブラウザに並ぶ。*/}
      {toggle ? <Count2 key='A' title='A' count={countA} setCount={setCountA} /> : <Count2 key='B' title='B' count={countB} setCount={setCountB} />}
    </>
  );
};

//⬇︎Count2コンポーネントを定義
const Count2 = ({ title, count, setCount }) => {
  const countUp = () => {
    setCount((prevState) => prevState + 1);
  };
  const countDown = () => {
    setCount(count - 1);
  };

  return (
    <>
      <h3>
        {title}: {count}
      </h3>
      <button onClick={countUp}>+</button>
      <button onClick={countDown}>-</button>
    </>
  );
};

export default Example;
