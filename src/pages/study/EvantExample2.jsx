//イベントに合わせて画面表示を更新してみよう
//useStateを使用する
import { useState } from 'react';

const EventExample2 = () => {
  const [val, setVal] = useState('');
  return (
    <>
      <h3>イベントリスナー No2</h3>
      <p>イベントに合わせて画面表示を更新してみよう。</p>
      自由に文字を入力➡︎
      <input type='text' onChange={(e) => setVal(e.target.value)} /> = {val}
    </>
  );
};

export default EventExample2;
