//LoginFormApp.jsxから責務分離
//ログイン「成功時の完了画面」

import React from 'react';

export const LoginSuccess = ({ email, onReset }) => {
  return (
    <div>
      <h2 style={{ color: 'green' }}>ログイン成功</h2>
      <p>
        ようこそ、<strong>{email}</strong> さん
      </p>

      <button
        onClick={onReset}
        style={{
          marginTop: '15px',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        ログアウト
      </button>
    </div>
  );
};
