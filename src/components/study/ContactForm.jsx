//FormApp3.jsxから責務分離
//入力フォーム＋エラー表示（見た目と入力操作

import React from 'react';

export const ContactForm = ({ formData, onChange, errors, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {/* 名前欄 */}
      <label htmlFor='name'>お名前:</label>
      <input type='text' id='name' name='yourname' value={formData.yourname} onChange={onChange} />
      {errors.yourname && <p style={{ color: 'red' }}>{errors.yourname}</p>}

      {/* メールアドレス */}
      <label htmlFor='email'>メールアドレス</label>
      <input type='email' id='email' name='email' value={formData.email} onChange={onChange} />
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      {/* メッセージ */}
      <label htmlFor='message'>メッセージ</label>
      <textarea id='message' name='message' value={formData.message} onChange={onChange} />
      {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}

      <button type='submit'>送信する</button>
    </form>
  );
};
