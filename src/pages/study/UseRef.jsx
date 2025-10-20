////◾︎useRefとは？
//・再レンダーを引き起こさずに「値」や「DOM 要素」への参照を保持できる仕組みです。
//・【DOM要素へのアクセスを保持できる】のが「useRef」です。
import { useState, useRef } from 'react';

//// ⬇︎①Case1 「useRefでDOMを取得」
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

// ////②Case2 「動画の再生・停止を制御」
// const Case2 = () => {
//   const [playing, setPlaying] = useState(false);
//   const videoRef = useRef(); //video要素を参照するためのrefオブジェクト

//   //⬇︎clickPlay関数(ボタン押下で再生・停止を切り替える)
//   const clickPlay = () => {
//     if (playing) {
//       videoRef.current.pause(); //動画を一時停止
//     } else {
//       videoRef.current.play(); //動画を再生
//     }
//     setPlaying(!playing); //playingの状態を反転(trueに更新 または falseに更新)
//   };

//   return (
//     <>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <video style={{ maxWidth: '50%' }} ref={videoRef}>
//           <source style={{ maxWidth: '100%' }} src='' type='video/mp4' />
//         </video>
//         <button onClick={clickPlay}>{playing ? '一時停止' : '再生'}</button>
//       </div>
//     </>
//   );
// };

//// ⬇︎UseRefコンポーネント
const UseRef = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '50px' }}>UseRefの勉強ページです。</h2>

      <div style={{ marginBottom: '80px' }}>
        <p>①useRefを使ってDOM要素にアクセスする</p>
        <Case1 />
      </div>

      {/* <div style={{ marginBottom: '40px' }}>
        <p>②useRefを使って動画の再生・停止を制御する</p>
        <Case2 />
      </div> */}
    </div>
  );
};

export default UseRef;
