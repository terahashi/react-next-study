//⬇︎「プルダウンボタン」を作成する
import { useState } from 'react';
const Select = () => {
  const [selected, setSelected] = useState('Apple');

  //⬇︎配列オブジェクト
  const OPTIONS = ['Apple', 'Banana', 'Cherry'];

  return (
    <div>
      <h3>プルダウンボタンを作成してみよう</h3>
      {/* ⬇︎return を書かないならJSXは()で囲もう!【(opt) => ()　のところ。】
          JavaScript（というかアロー関数）のルールで
          {}（波括弧）を使うと → 中に処理を書くものとみなされる → return が必要
          ()（丸括弧）を使うと → すぐに値を返すとみなされる → return は省略されて自動で適用される
      */}
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        {OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}

        {/*⬇︎mapメソッドを使わない書き方。*/}
        {/*
        <option value='Apple'>Apple</option>
        <option value='Banana'>Banana</option>
        <option value='Cherry'>Cherry</option> */}
      </select>

      <div>選択された果物:{selected}</div>
    </div>
  );
};

export default Select;
