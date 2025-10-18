////◾︎useRefとは？
//・再レンダーを引き起こさずに「値」や「DOM 要素」への参照を保持できる仕組みです。
//・【DOM要素へのアクセスを保持できる】のが「useRef」です。
import { useState, useRef } from 'react';

//// ⬇︎Case1 useRefでDOMを取得
//「refオブジェクト(inputRef)」をref(ref={inputRef})属性に渡すとDOMを参照することができます。
const Case1 = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef(); //「refオブジェクト」を作成
  //⬇︎ボタンがクリックされたときにinput要素にフォーカスする関数
  const handleClick = () => {
    inputRef.current.focus(); //「refオブジェクト」のcurrentプロパティを使って、DOM要素にアクセス
  };
  return (
    <div>
      <input type='text' ref={inputRef} value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleClick}>input要素へフォーカスする</button>
    </div>
  );
};

//// ⬇︎UseRefコンポーネント
const UseRef = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>UseRefの勉強ページです。</h2>
      <div style={{ marginBottom: '40px' }}>
        <p>①useRefを使って DOM要素にアクセスする</p>
        <Case1 />
      </div>
    </div>
  );
};

export default UseRef;
