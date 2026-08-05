//LoginFormApp.jsxから責務分離
//ログイン成功時の「完了画面」です。

import React from 'react';

export const LoginSuccess = ({ email, user, onReset }) => {
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      {/* ⬇︎ヘッダー */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '100px',
          paddingBottom: '10px',
          gap: '10px',
        }}
      >
        <h2 style={{ margin: 0 }}>マイページ</h2>
        <button
          onClick={onReset}
          style={{
            padding: '4px 8px',
            fontSize: '14px',
            lineHeight: '1',
            height: '36px',
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ログアウト
        </button>
      </header>

      {/* ⬇︎メインコンテンツ（ユーザー情報カード） */}
      <main>
        <h3
          style={{
            marginBottom: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px', // ここで全体のすき間を調整！
          }}
        >
          <span>おかえりなさい！</span>
          <span>{user?.email}さん。</span>
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label>✅ログイン中のメールアドレス</label>
          {/* user?.email で Supabase から届いたメールアドレスを表示 */}
          <p>{user?.email}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label>✅ユーザー固有ID(UUID)</label>
          {/* user?.id で Supabase が発行した固有IDを表示 */}
          <p>{user?.id}</p>
        </div>
      </main>
    </div>
  );
};
