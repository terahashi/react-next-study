////◾︎useRefとは？
//・再レンダーを引き起こさずに「値」や「DOM 要素」への参照を保持できる仕組みです。
//・【DOM要素へのアクセスを保持できる】のが「useRef」です。
import { useState, useRef } from 'react';

///////// ⬇︎①Case1 「useRefでDOMを取得」してみよう。
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

///////// ②Case2 「動画の再生・停止を制御」をしてみよう。
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

///////// ③Case3 useRefとは?「再レンダリングせずに値を保持する」を確認する
const createTimeStamp = () => new Date().getTime();

const Case3 = () => {
  const [timeStamp, setValue] = useState(createTimeStamp()); //普通のstateを作成
  const ref = useRef(createTimeStamp()); //refオブジェクトを作成

  ////■イベントハンドラー
  //⬇︎stateを更新する関数(createTimeStamp(現在の時刻)で現在のタイムスタンプを取得してstateに代入)
  const updateState = () => {
    setValue(createTimeStamp());
  };
  //⬇︎ref.currentを更新する関数(createTimeStamp(現在の時刻)で現在のタイムスタンプを取得してref.currentに代入)
  const updateRef = () => {
    ref.current = createTimeStamp();
    console.log('ref.current ->', ref.current);
  };

  return (
    <div>
      <h3>
        stateでTimestamp(現在の時刻)を更新: {timeStamp}
        <button onClick={updateState}>更新</button>
      </h3>
      <h3>
        ref(コンソールにTimestamp(現在の時刻)が表示される): {ref.current}
        <button onClick={updateRef}>更新</button>
      </h3>
    </div>
  );
};

//// ⬇︎UseRefコンポーネント
const UseRef = () => {
  return (
    <div>
      <h2 style={{ marginBottom: '60px' }}>UseRefの勉強ページです。</h2>

      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '0px' }}>ユースケース1</h2>
        <p>①useRefを使ってDOM要素(inputに)にアクセスする</p>
        <Case1 />
      </div>

      {/* <div style={{ marginBottom: '80px' }}>
        <p>②useRefを使って動画の再生・停止を制御する</p>
        <Case2 />
      </div> */}

      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ marginBottom: '0px' }}>ユースケース2</h2>
        <p>③useRefを使って再レンダリングせずに値を保持する</p>
        <Case3 />
      </div>
    </div>
  );
};

export default UseRef;
