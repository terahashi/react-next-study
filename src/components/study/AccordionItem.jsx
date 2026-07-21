//「AccordionApp.jsx」から責務分離したコンポーネント

import React from 'react';

//// 親から届くデータや関数を Props で受け取る
export const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  // ⬇︎処理を書いた場合、最終的にどれを画面に返せばいいのか分からないので「これを返してね！」という合図return() が絶対に必要。
  return (
    <div style={{ border: '1px solid #000' }}>
      {/* ⬇︎質問部分（クリックで発動） */}
      <div onClick={onToggle} style={{ cursor: 'pointer', background: '#064251', padding: '10px' }}>
        <span>{question}</span>
        <span style={{ color: '#000', background: '#eceded', padding: '1px', display: 'block' }}>{isOpen ? '閉じる' : '開く'}</span>
      </div>

      {/* ⬇︎回答部分（isOpenが「trueの時だけ開く」） */}
      {isOpen && (
        //  ⬇︎1マスを横幅300pxに固定する（文字が長くても 横幅300px 以上には広がらなくなる！）
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 300px)', gap: '16px', padding: '10px' }}>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
