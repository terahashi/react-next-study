//FormAppの「form部分を責務分離」する。
import React from 'react';

export const SimpleForm = ({ userName, error, onChange, onSubmit }) => {
  // 中身は<FormApp>のreturn内の<form>タグの中身。
  return (
    <>
      <form onSubmit={onSubmit}>
        {/* //名前入力の文言 */}
        <label htmlFor='userName'>ユーザー名:</label>

        {/* //右のinput欄 */}
        <input type='text' id='userName' value={userName} onChange={onChange} />

        {/* //①エラー有りのとき場合はエラー文言を表示する。②エラー無しのとき(中身：null)は何も表示しない。
        ①エラー有りのとき
        error ➡ 文字列が入っているので、JSの世界では「trueっぽい（文字列あるよ or エラーがあるよ）」と見なされる。
        !error ➡ その反対なので、純粋な「false(文字列ないよ or エラーないよ)」にひっくり返る。
        ⭕️!!error ➡ さらにその反対なので、純粋な「true(エラーがある、だからボタンの無効化する)になる。

        ②エラー無しのとき（中身：null）
        error ➡ null なので、JSの世界では「falseっぽい（ないよ）」と見なされる。
        !error ➡ その反対なので、純粋な「trueにひっくり返る。」
        ⭕️!!error ➡ さらにその反対なので、純粋な「false(ボタンの無効化が解除されてボタンが押せるようになります。)」になる！
        */}
        {!!error && <p>{error}</p>}

        {/* //送信ボタン。「エラーがある場合はdisableで無効化にする。」 */}
        <button type='submit' disabled={!!error || userName.trim() === ''}>
          送信ボタン
        </button>
      </form>
    </>
  );
};
