//中身の文字数がバラバラでも、カードの高さが自動でピタッと揃い、ボタンが一番下に綺麗に整列するコンポーネント
import React from 'react';
import { CardItem } from '../../components/study/CardItem';

//データ配列を用意する
const CARD_DATA = [
  { id: 1, title: 'カードA', text: '短いテキスト。' },
  {
    id: 2,
    title: 'カードB',
    text: '非常に長いテキストです。非常に長いテキストです。非常に長いテキストです。非常に長いテキストです。非常に長いテキストです。非常に長いテキストです。非常に長いテキストです。非常に長いテキストです。',
  },
  { id: 3, title: 'カードC', text: '中くらいの長さのテキストが入ります。' },
];

//CardAppコンポーネントを作成する
export const CardApp = () => {
  return (
    <div>
      {/* 解説文h2 */}
      <h2>レスポンシブGrid & 高さ揃えカード</h2>

      {/* ①外枠 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* auto-fit➡「画面の横幅を見て、入る分だけカードを横に限界まで詰め込んで」　minmax(200px, 1fr)➡「幅が、最小200pxより小さくならない、最大は余りを1ずつの割合で平等に分ける」 */}

        {/* ②カードをmapで展開 */}
        {CARD_DATA.map((card) => (
          // //⬇︎CardItemコンポーネントに分離する。
          // //③中身を縦並びにして、ボタンを一番下に沈める
          // <div key={card.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #000', padding: '20px' }}>
          //   {/* ⬇︎上側エリア（タイトルと本文） */}
          //   <div>
          //     <h3>{card.title}</h3>
          //     <p>{card.text}</p>
          //   </div>
          //   {/* ⬇︎下側のボタンエリア */}
          //   <button>ボタン</button>
          // </div>

          //⬇︎CardItemコンポーネント
          <CardItem key={card.id} title={card.title} text={card.text} />
        ))}
      </div>
    </div>
  );
};
