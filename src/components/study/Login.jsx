//LoginFormApp.jsxから責務分離
//ログインフォーム初期画面

import styled from 'styled-components';

// フォーム全体のカード枠
const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px;
`;

//ログインとパスワード欄のflex調整
const FlexContainer = styled.div`
  display: block;
  margin-bottom: 20px;
`;

//「パスワードを目視」する用の表示・非表示の切り替えの調整
const TogglePasswordButton = styled.button`
  white-space: nowrap;
  cursor: pointer;
  padding: 0.4em 0.6em;
  margin-top: 10px;
  /* @media (min-width: 768px) {

  } */
`;

//ラベル
const StyleLabel = styled.label`
  white-space: nowrap;
  flex-shrink: 0;
  display: block;
  margin-right: 10px;
`;

//インプット入力欄
const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

// エラーメッセージテキスト
const ErrorText = styled.p`
  color: #dc3545;
  margin-bottom: 15px;
  font-size: 14px;
`;

// ログインボタンと新規登録ボタンの縦並び
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// ログイン/新規登録の送信ボタン（propsで色を動的に変更）
const SubmitButton = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.$isLoginMode ? '#007bff' : '#28a745')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

// UI切り替え(ログインボタンと新規登録ボタンを切り替える)
const SwitchModeLink = styled.p`
  cursor: pointer;
  color: #007bff;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const Login = ({ formData, showPassword, errorMessage, onChange, onTogglePassword, handleLogin, handleSignup, uiMode, handleUiModeChange }) => {
  //⬇︎現在が「ログインモード」か「新規登録モード」かを判定する関数(true: ログイン / false: 新規登録）
  const isLoginMode = uiMode === 'login'; // uiModeが'login'ならtrue、'signup'ならfalseを返す。

  return (
    <FormWrapper>
      {/* //⬇︎isLoginModeが「trueならログインモード」、「falseなら新規登録モード」のフォームを表示する */}
      <form onSubmit={isLoginMode ? handleLogin : handleSignup}>
        {/* メールアドレス */}
        <FlexContainer>
          <StyleLabel>メールアドレス:</StyleLabel>
          <StyledInput id='email' type='email' name='email' value={formData.email} onChange={onChange} placeholder='yourMail@email.com' autoComplete='email' />
        </FlexContainer>
        {/* パスワード入力欄 */}
        <FlexContainer>
          <StyleLabel htmlFor='password'>パスワード:</StyleLabel>
          <StyledInput
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formData.password}
            onChange={onChange}
            placeholder='パスワードを入力'
            autoComplete='current-password'
          />

          {/* 「パスワードを目視」する用の表示・非表示の切り替え */}
          <TogglePasswordButton type='button' onClick={onTogglePassword}>
            {showPassword ? 'pass非表示' : 'pass表示'}
          </TogglePasswordButton>
        </FlexContainer>

        {/* エラーメッセージがある場合は表示する */}
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        {/* ログインボタンと新規登録ボタン */}
        <ButtonGroup>
          {/* 送信ボタン(ログイン & 新規登録を1つに統合したボタン) */}
          <SubmitButton type='submit' $isLoginMode={isLoginMode}>
            {isLoginMode ? 'ログイン' : '新規登録'}
          </SubmitButton>

          {/* UI切り替え(ログインボタンと新規登録ボタンを切り替えるテキスト) */}
          <SwitchModeLink onClick={handleUiModeChange}>{isLoginMode ? 'アカウントをお持ちでない方はこちら(新規登録)' : 'すでにアカウントをお持ちの方はこちら(ログイン)'}</SwitchModeLink>

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
        </ButtonGroup>
      </form>
    </FormWrapper>
  );
};
