//FormApp3.jsxから責務分離
import React from 'react';

export const ContactSuccess = ({ onClick }) => {
  return (
    <div>
      <h2>送信が完了しました！</h2>
      <p>お問い合わせありがとうございました。</p>

      {/* もう一度送信するボタン */}
      <button onClick={onClick}>もう一度フォームに戻る</button>
    </div>
  );
};
