//実際の「パスワード付きのログインフォーム」を作成しよう。

//詳しくは「tech.txtファイル」を参照。
// 🍎用意するもの
// 💡1: フロントエンド(画面側)
// ・使うもの: React, HTML/CSS など
// 💡2: バックエンド(APIサーバー)
// 今回使う➡️Supabase Auth
// 💡3: データベース(DB)
// 今回使う➡️Supabase (PostgreSQL)
// 💡4: 認証の仕組み(鍵のやり取り)
// ・使う技術:
// JWT(JSON Web Token): ログイン成功時にサーバーから送られる「デジタル通行証」。React側はこれを受け取って保持しておく。

// 🍎どこでサーバーを動かすの？
// ・API・DB(バックエンド)を置く場所:
// 今回使う➡️Supabase。
// Supabase 自身が「APIプログラムを動かすサーバー」を最初から用意してくれている！

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Supabaseの公式ライブラリ

//styled-components
//createGlobalStyleとは「body など、アプリ全体に適用するCSSを作成する機能」
import styled, { createGlobalStyle } from 'styled-components';

import { Login } from '../../components/study/Login';
import { LoginSuccess } from '../../components/study/LoginSuccess';

// このログインアプリだけに「bodyタグ専用のグローバルスタイル」を定義
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f1f1f1;
    color: #333333;
    margin: 0;
  }
  /* Viteのデフォルトダークモードを打ち消す */
  input, select, textarea {
    background-color: #ffffff;
    color: #333333;
    border: 1px solid #ced4da;
  }
`;

// ログインアプリ全体の背景（画面の高さいっぱいに薄いグレーを敷く）
const AppContainer = styled.div`
  background-color: #f1f1f1;
`;

// エラーの日本語化：ログインや新規登録で表示される「Supabaseの英語エラー」を日本語に変換する関数を作成
const translateError = (errorMessage) => {
  if (!errorMessage) return ''; // 「エラーメッセージが無い場合」は空文字を返す

  // エラーの日本語訳を定義する
  const errorTranslations = {
    'email rate limit exceeded': 'メールの送信制限を超えました。しばらく待ってから再試行してください。',
    email_not_confirmed: 'メールアドレスが確認されていません。確認メールをチェックしてください。',
    'Email not confirmed': 'メールアドレスが確認されていません。確認メールをチェックしてください。',
    over_email_send_rate_limit: 'メールの送信制限を超えました。しばらく待ってから再試行してください。',
    email_already_in_use: 'このメールアドレスはすでに使用されています。',
    invalid_email: 'メールアドレスが無効です。正しい形式を使用してください。',
    'missing email or phone': 'ログインに必要な項目が入力されていません。',
    'Anonymous sign-ins are disabled': 'ログインに失敗しました。',
    'User already registered': 'このユーザーは既に登録されています。',
    'Invalid login credentials': 'ログイン情報が誤っています。',
    'Password should be at least 6 characters': 'パスワードは6文字以上である必要があります。',
    validation_failed: '入力内容の検証に失敗しました。',
  };

  // errorTranslations の中から該当するキーワードが含まれているか探す
  for (const [key, value] of Object.entries(errorTranslations)) {
    if (errorMessage.includes(key)) {
      return value; // 見つかったら日本語を返す
    }
  }

  // errorTranslations になかった想定外のエラーはそのまま表示
  return `エラー: ${errorMessage}`;
};

export const LoginFormApp = () => {
  //1: フォームの入力値のstate(メール、パスワード)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //2: パスワードの表示/非表示フラグ(デフォルト：非表示)
  const [showPassword, setShowPassword] = useState(false);

  //3: ログイン完了状態のフラグ
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //4: UI切り替えのstate(ログインボタンと、新規会員登録ボタンを三項演算子で切り替える)
  const [uiMode, setUiMode] = useState('login'); // 初期は'login' もしくは 'signup'で切り替える。

  //5: Supabaseから取得したユーザー情報のstate
  const [user, setUser] = useState(null);

  // エラーメッセージのstate
  const [errorMessage, setErrorMessage] = useState('');

  //ページ読み込み時の「キー情報でのログイン済/否の初回チェック」 ➡️ つまりアプリ起動時・セッション状態の変化を監視する useEffect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      //⬆︎data: は変数名ではなく、「dataという箱の中身を開けて、session を出してください」 と指定しているのが data: の部分。
      //⬆︎{ data: { session } } は「分割代入」。Supabaseから返ってきた大きなdataという箱から直接「session(セッション情報)だけを抜き出しています。」
      //⬆︎supabase.auth.getSession ➡️ ストレージ(保管庫)を見に行き、前回ログインした時の「暗号化されたカードキー(セッション)」が残っているかを取り出すSupabaseの関数です。
      console.log('🟦 [getSession] sessionの中身:', session);
      if (session) {
        //⬆︎ブラウザにカードキー(有効なセッション)が残っていた場合のみ、中身を実行します
        setUser(session.user); //setUser(session.user) ➡️ セッション内に含まれるユーザー情報(メールアドレスやユーザーIDなど)を Stateにセットする。
        setIsLoggedIn(true); //ログインフラグをtrueに更新します。これによって画面が再描画されログインフォームではなく LoginSuccess 画面が表示されます。
      }
    });

    //キー情報の24時間監視(onAuthStateChange) ➡️ ログイン・ログアウトの変更をリアルタイム監視
    const {
      data: { subscription }, //data: は変数名ではなく、「dataという箱の中身を開けて、その中のsubscriptionを出してください」 という指定。
    } = supabase.auth.onAuthStateChange((_event, session) => {
      //⬆︎onAuthStateChange: Supabaseに「ログイン状態が変わったら、教えて」と監視を命じる関数。
      //⬆︎_event: 「何が起きたか(SIGNED_IN や SIGNED_OUT)」というイベント名が入ります。(使わない変数なので、慣習的に頭に _ をつける)
      //⬆︎session: 変化が起きたあとの「セッション情報(カードキー)」
      console.log('🟥 [onAuthStateChange] イベント名:', _event);
      console.log('🟥 [onAuthStateChange] sessionの中身:', session);

      if (session) {
        //ログインしたら ➔ session にデータが入って届く ➔ setIsLoggedIn(true) が動く！
        setUser(session.user);
        setIsLoggedIn(true);
      } else {
        //ログアウトしたら ➔ session が null で届く ➔ setIsLoggedIn(false) が動く！
        setUser(null);
        setIsLoggedIn(false);
      }
    });
    console.log('🟩 [subscription] リモコンの中身:', subscription);

    // ⬇︎クリーンアップ処理(画面が閉じられたら「監視カメラ(onAuthStateChange)」の電源を切る処理)
    return () => subscription.unsubscribe();
  }, []);

  //フォームの入力値変更のイベントハンドラー
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //「パスワードを目視」する用の表示・非表示の切り替えハンドラー
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  //「ログイン処理」のイベントハンドラー
  //【Supabase】に「ログインして！」と通信する。
  //API通信は非同期処理なので、async awaitを使い通信を待ってから次の行〜 if (error){...} 〜を実行する。
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // 直前のエラーメッセージをリセット

    //未入力チェック！
    if (!formData.email || !formData.password) {
      setErrorMessage('メールアドレスとパスワードを入力してください');
      return;
    }

    try {
      //🚀【Supabase】に「ログインして！」と通信する
      //APIを呼び出す。
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      //エラー(メアド間違い、パスワード間違いなど)
      if (error) {
        setErrorMessage(`ログイン失敗: ${translateError(error.message)}`);
        return;
      }

      //ログイン成功したら画面を切り替える！
      //アーリーリターン用に「ログイン完了状態のフラグをtrue」にする。
      console.log('ログイン成功データ:', data);
      setIsLoggedIn(true);
    } catch (err) {
      setErrorMessage('予期せぬエラーが発生しました');
    }
  };

  //「新規会員登録の処理」、サインアップ処理のイベントハンドラー
  const handleSignup = async (e) => {
    //APIを呼び出す。
    e.preventDefault();
    setErrorMessage(''); // 直前のエラーメッセージをリセット

    //未入力チェック！
    if (!formData.email || !formData.password) {
      setErrorMessage('メールアドレスとパスワードを入力してください');
      return;
    }
    try {
      //🚀【Supabase】の「新規会員登録」サインアップのAPIを呼び出す
      //APIを呼び出す。
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      //エラー(メアド間違い、パスワード間違いなど)
      if (error) {
        setErrorMessage(`新規登録失敗: ${translateError(error.message)}`);
        return;
      }

      //⬇︎メール確認設定(Confirm email)がオフの場合はそのままユーザー作成完了！
      console.log('新規登録成功データ:', data);

      //⬇︎自動でログイン画面モードに戻す！
      handleUiModeChange();
    } catch (err) {
      setErrorMessage('予期せぬエラーが発生しました');
    }
  };

  //「UI切り替え」のイベントハンドラー
  const handleUiModeChange = (e) => {
    if (e) e.preventDefault(); // e.preventDefault(); だけでも全く問題はないが、
    //if (e) を付けることで、handleUiModeChange()を呼び出す時に「e」が無くてもエラーにならないようにする。
    //将来的にボタンクリック以外の場所(別の関数の中など)から、引数なしで handleUiModeChange() と直接呼び出す場面があったとします。この場合、eが存在するときだけ実行されるため、直接呼び出してもエラーにならず安全。
    //■使うケース：新規登録が成功したら、自動でログイン画面に戻したい時など。
    //ユーザーが新規登録ボタンを押し、登録完了のレスポンスが返ってきた後に、自動で画面を「ログインモード」に切り替えたいという要件が追加されたとします。

    setErrorMessage('');

    //下記にクリックされた時に 'login' ↔ 'signup' を反転させる処理を追加する
    setUiMode((prev) => (prev === 'login' ? 'signup' : 'login')); //state初期値はloginなので「クリックされた時 prev === 'login'がtrueになので'signup'に切り替わる」処理になる。
  };

  //「ログアウト(リセット)の処理」のイベントハンドラー
  const handleLogout = async () => {
    //⬇︎Supabaseのストレージ(保管庫)からカードキーを消す
    await supabase.auth.signOut();

    //⬇︎見た目(State)をリセットする
    setFormData({ email: '', password: '' });
    setIsLoggedIn(false);
    setUser(null); // ユーザー情報をnullにする
    setShowPassword(false);
    setErrorMessage('');
  };

  //ログイン成功時は完了画面を返す(アーリーリターン)
  if (isLoggedIn) {
    return (
      <>
        <GlobalStyle />

        <AppContainer>
          <LoginSuccess user={user} onReset={handleLogout} />
        </AppContainer>
      </>
    );
  }

  //JSX「ログインフォーム」
  return (
    <>
      {' '}
      <GlobalStyle />
      <AppContainer>
        <div style={{ margin: '0 auto' }}>
          <h2>ログインフォーム</h2>
          <div
            style={{
              backgroundColor: '#d5e9f9',
              padding: '12px 16px',
              borderRadius: '6px',
              marginBottom: '20px',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#1c3d5a',
            }}
          >
            <strong>■動作確認用のアカウント情報</strong>
            <br />
            <strong>【ログインを試したい場合（テスト用）】</strong>
            <br />
            メールアドレス: <code>test00@example.com</code>
            <br />
            パスワード: <code>Test_25269123Pass</code>
            <br />
            <span>※「新規登録ボタン」で自由なメールアドレス・パスワードで登録も可能。</span>
            <br />
            <strong>このアプリは「React × ⚡️Supabase」を使用して作成しています。</strong>
          </div>

          {/* ⬇︎ログインフォーム初期画面 */}
          {/* Login.jsxを表示するコンポーネントを呼び出す */}
          <Login
            formData={formData}
            showPassword={showPassword}
            errorMessage={errorMessage}
            onChange={handleChange}
            onTogglePassword={togglePasswordVisibility}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            uiMode={uiMode} //「UI切り替え」のstate
            handleUiModeChange={handleUiModeChange} //「UI切り替え」のイベントハンドラー
          />
          {/* <form onSubmit={handleSubmit} style={{ display: 'block', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label htmlFor='email' style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'block', marginRight: '10px' }}>
            メールアドレス:
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='yourMail@email.com'
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            autoComplete='email'
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <label htmlFor='password' style={{ whiteSpace: 'nowrap', flexShrink: 0, display: 'block', marginRight: '10px' }}>
            パスワード:
          </label>
          <input
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='パスワードを入力'
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            autoComplete='current-password'
          />

          <button type='button' onClick={togglePasswordVisibility} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
            {showPassword ? 'pass非表示' : '👁️'}
          </button>
        </div>

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
      </form> */}
        </div>
      </AppContainer>
    </>
  );
};
