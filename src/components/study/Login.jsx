//LoginFormApp.jsxから責務分離
//ログインフォーム初期画面

export const Login = ({ formData, showPassword, errorMessage, onChange, onTogglePassword, handleLogin, handleSignup, uiMode, handleUiModeChange }) => {
  //⬇︎現在が「ログインモード」か「新規登録モード」かを判定する関数(true: ログイン / false: 新規登録）
  const isLoginMode = uiMode === 'login'; // uiModeが'login'ならtrue、'signup'ならfalseを返す。

  return (
    <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto', boxSizing: 'border-box', padding: '20px' }}>
      {/* //⬇︎isLoginModeが「trueならログインモード」、「falseなら新規登録モード」のフォームを表示する */}
      <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
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
            {showPassword ? 'pass非表示' : 'pass表示'}
          </button>
        </div>

        {/* エラーメッセージがある場合は表示する */}
        {errorMessage && <p style={{ color: 'red', marginBottom: '15px' }}>{errorMessage}</p>}

        {/* ログインボタンと新規登録ボタン */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* 送信ボタン(ログイン & 新規登録を1つに統合したボタン) */}
          <button
            type='submit'
            style={{
              padding: '10px',
              backgroundColor: isLoginMode ? '#007bff' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {isLoginMode ? 'ログイン' : '新規登録'}
          </button>

          {/* UI切り替え(ログインボタンと新規登録ボタンを切り替えるテキスト) */}
          <p
            onClick={handleUiModeChange}
            style={{
              cursor: 'pointer',
              color: '#007bff',
              textAlign: 'center',
            }}
          >
            {isLoginMode ? 'アカウントをお持ちでない方はこちら(新規登録)' : 'すでにアカウントをお持ちの方はこちら(ログイン)'}
          </p>

          {/* 新規登録ボタン(1つのボタンに統合したので必要なし) */}
          {/* <button
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
        </button> */}
        </div>
      </form>
    </div>
  );
};
