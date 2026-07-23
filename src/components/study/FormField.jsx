//FormApp2.jsxの、入力欄＋エラー表示を「責務分離したコンポーネント」
import React from 'react';

export const FormField = ({ id, label, type = 'text', value, onChange, placeholder, error }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label htmlFor={id} style={{ display: 'block' }}>
        {label}
        <input type={type} id={id} name={id} value={value} onChange={onChange} placeholder={placeholder} />
      </label>

      {/* エラーメッセージが存在するときだけ表示 */}
      {error && <p>{error}</p>}
    </div>
  );
};
