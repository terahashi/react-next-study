//カード1枚のコンポーネントを作成する
import React from 'react';

export const CardItem = ({ title, text }) => {
  return (
    //③中身を縦並びにして、ボタンを一番下に沈める
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #000', padding: '20px' }}>
      {/* ⬇︎上側エリア（タイトルと本文） */}
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {/* ⬇︎下側のボタンエリア */}
      <button>ボタン</button>
    </div>
  );
};
