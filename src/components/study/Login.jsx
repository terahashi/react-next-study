//LoginFormApp.jsxから責務分離
//ログインフォーム初期画面

export const Login = ({ formData, showPassword, errorMessage, onChange, onTogglePassword, handleLogin, handleSignup }) => {
  return (
    <form onSubmit={handleLogin} style={{ display: 'block', padding: '20px' }}>
      {/* メールアドレス */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <label htmlFor='email' style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'block', marginRight: '10px' }}>
          メールアドレス:
        </label>
        <input
          id='email'
          type='email'
          name='email'
          value={formData.email}
          onChange={onChange}
          placeholder='yourMail@email.com'
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          autoComplete='email'
        />
      </div>
      {/* パスワード入力欄 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <label htmlFor='password' style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'block', marginRight: '10px' }}>
          パスワード:
        </label>
        <input
          id='password'
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={formData.password}
          onChange={onChange}
          placeholder='パスワードを入力'
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          autoComplete='current-password'
        />

        {/* 「パスワードを目視」する用の表示・非表示の切り替え */}
        <button type='button' onClick={onTogglePassword} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
          {showPassword ? 'pass非表示' : '👁️'}
        </button>
      </div>

      {/* エラーメッセージがある場合は表示する */}
      {errorMessage && <p style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</p>}

      {/* ログインボタンと新規登録ボタン */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {/* ログイン送信ボタン */}
        <button
          type='submit'
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ログイン
        </button>
        {/* 新規登録ボタン */}
        <button
          type='button'
          style={{
            padding: '10px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={handleSignup}
        >
          新規登録
        </button>
      </div>
    </form>
  );
};
