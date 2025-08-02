//Radioボタンを作成する
import { useState } from 'react';

const Radio = () => {
  //⬇︎useState
  const [fruit, setFruit] = useState('Apple');
  //⬇︎イベントハンドラ
  const onChange = (e) => setFruit(e.target.value);
  //⬇︎mapメソッドで使用する「配列の果物たち」
  const RADIO_COLLECTION = ['Apple', 'Banana', 'Cherry'];

  return (
    <>
      <h3>簡単なラジオボタンを作成してみよう(mapメソッドで作成)</h3>
      {/* ⬇︎②mapメソッドでラジオボタンを作成したパターン */}
      {RADIO_COLLECTION.map((value) => {
        return (
          <label key={value}>
            <input type='radio' name='fruit' value={value} checked={fruit === value} onChange={onChange} />
            {value}
          </label>
        );
      })}
      {/* ⬇︎①<label>でラジオボタンを作成したパターン */}
      {/* <label>
        <input type='radio' name='fruit' value='Apple' checked={fruit === 'Apple'} onChange={onChange} />
        Apple
      </label>
      <label>
        <input type='radio' name='fruit' value='Banana' checked={fruit === 'Banana'} onChange={onChange} />
        Banana
      </label>
      <label>
        <input type='radio' name='fruit' value='Melon' checked={fruit === 'Melon'} onChange={onChange} />
        Melon
      </label> */}

      <h4>選択した果物:{fruit}</h4>
    </>
  );
};

export default Radio;
