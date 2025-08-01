//フォームの「InputとTextarea」を作成してみよう
import { useState } from 'react';

const InputTextarea = () => {
  //⬇︎useState
  const [val, setVal] = useState('');
  const [val2, setVal2] = useState('');

  //⬇︎イベントハンドラ
  const clearVal = () => setVal('');
  const clearVal2 = () => setVal2('');

  return (
    <>
      <h3>input要素、textarea要素の使い方を学ぼう</h3>
      <p>「インプット-消去値ボタン」を押すと【インプットエリアの値が初期値に戻ります。】</p>
      <p>「テキスト-消去値ボタン」を押すと【テキストエリアの値が初期値に戻ります。】</p>

      <div>
        <label htmlFor='123'>ラベル</label>

        <div>
          <input id='123' placeholder='インプットエリア' value={val} onChange={(e) => setVal(e.target.value)} />
          <textarea id='456' placeholder='テキストエリア' value={val2} onChange={(e) => setVal2(e.target.value)} />
        </div>

        <h3>インプットエリア結果:{val}</h3>
        <h3>テキストエリア結果:{val2}</h3>

        <button onClick={clearVal}>インプット-消去値ボタン</button>
        <button onClick={clearVal2}>テキスト-消去値ボタン2</button>
      </div>
    </>
  );
};

export default InputTextarea;
