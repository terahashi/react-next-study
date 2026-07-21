//アコーディオンを作成(「質問」をクリックすると、その下にある「回答」がパカッと現れるコンポーネント)

import React from 'react';
import { useState } from 'react';

import { AccordionItem } from '../../components/study/AccordionItem';

// ① 表示するためのデータ（配列）
const FAQ_DATA = [
  { id: 1, question: 'Q1. 返品は可能ですか？', answer: 'A. 未開封の場合に限り、商品到着後7日以内であれば可能です。' },
  { id: 2, question: 'Q2. 支払い方法は何がありますか？', answer: 'A. クレジットカード決済、コンビニ払い、銀行振込に対応しています。' },
  { id: 3, question: 'Q3. 配送までに何日かかりますか？', answer: 'A. ご注文から通常2〜3営業日以内に発送いたします。' },
];

//AccorddionAppコンポーネントを作成
export const AccordionApp = () => {
  // ② 「今何番のIDが開いているか」を覚えておくState（初期値は何も開いていないので null）
  const [openId, setOpenId] = useState(null);

  // ③ 質問がクリックされた時のイベントハンドラ
  const handleToggle = (id) => {
    //クリックされたアコーディオンが「既に開いている場合」は閉じる（openIdをnull(何も開いていない)にする）、それ以外の場合はクリックされたアコーディオン(id)を開く（openIdをクリックされたアコーディオンのidにする）
    //三項演算子を使用する
    setOpenId((prevId) => (prevId === id ? null : id));
  };
  return (
    <div>
      <h2>アコーディオンテスト</h2>

      {/* //外枠 */}
      <div>
        {/* //アコーディオンをmapで展開 */}
        {FAQ_DATA.map((faq) => {
          // isOpenは、「自分のID(faq.id)」と「開いているopenId」が一致している時だけtrue。つまり(<span>【{isOpen ? '閉じる' : '開く'}】</span>の閉じる)になる。
          // それ以外の場合はfalse。つまり(<span>【{isOpen ? '閉じる' : '開く'}】</span>の開く)になる。
          // 回答部分（isOpenがtrueの時だけ開く）
          // const isOpen = openId === faq.id;

          // ⬇︎処理を書いた場合、最終的にどれを画面に返せばいいのか分からないので「これを返してね！」という合図return() が絶対に必要。
          return <AccordionItem key={faq.id} question={faq.question} answer={faq.answer} isOpen={openId === faq.id} onToggle={() => handleToggle(faq.id)} />;

          // ⬇︎処理を書いた場合、最終的にどれを画面に返せばいいのか分からないので「これを返してね！」という合図return() が絶対に必要。
          // return (
          //   <div key={faq.id} style={{ border: '1px solid #000' }}>
          //     {/* ⬇︎質問部分（クリックで発動） */}
          //     <div onClick={() => handleToggle(faq.id)} style={{ cursor: 'pointer', background: '#064251', padding: '10px' }}>
          //       <span>{faq.question}</span>
          //       <span style={{ color: '#000', background: '#eceded', padding: '1px', display: 'block' }}>{isOpen ? '閉じる' : '開く'}</span>
          //     </div>
          //     {/* ⬇︎回答部分（isOpenが「trueの時だけ開く」） */}
          //     {isOpen && (
          //       //  ⬇︎1マスを横幅300pxに固定する（文字が長くても 横幅300px 以上には広がらなくなる！）
          //       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 300px)', gap: '16px', padding: '10px' }}>
          //         <p>{faq.answer}</p>
          //       </div>
          //     )}
          //   </div>
          // );
        })}
      </div>
    </div>
  );
};
