//お問い合わせフォーム（複数入力の共通化＋バリデーション＋送信処理）」を完成させる
////FormApp.jsxとFormApp2.jsxの「バリデーション(入力値の検証)付きフォームを更に応用した」練習問題。

import React, { useState } from 'react';
import { ContactForm } from '../../components/study/ContactForm';
import { ContactSuccess } from '../../components/study/ContactSuccess';

export const FormApp3 = () => {
  //①「複数の入力欄」をuseStateで管理する
  const [formData, setFormData] = useState({
    yourname: '',
    email: '',
    message: '',
  });

  //②エラーメッセージ用のstate
  const [errors, setErrors] = useState({});

  //③送信完了メッセージ用のstate
  const [isSubmitted, setIsSubmitted] = useState(false);

  //④‼️handleChange / 入力値変更用のハンドラー（1つの関数で全入力欄を共通処理！）
  const handleChange = (e) => {
    // ⬇︎ name  : どの入力欄か？（例: "yourname" や "email" という『入力欄の名前』）
    // ⬇︎ value : いま何と入力されたか？（例: ユーザーが打った『最新の文字』）
    // 【<input name='yourname' value={formData.yourname}/>、つまりe.target】から「どの入力欄か(name)」と「打ち込まれた文字(value)」を取り出す
    // 例：お名前欄に「田中」と打った時 ➔ name は "yourname"、value は "田中"　ということ。
    const { name, value } = e.target;

    setFormData((prev) => ({
      // ◯今回の =>({}) の場合 ➡️ (丸括弧) がある。丸括弧で囲まれているから【中身をそのまま return（返却）するということ。】
      // × => {} の場合 ➡️ 波括弧は本来じゃ関数の処理部屋（ブロック）だ。部屋の中に ...prev, と書いてあるので……文法エラーになる(JavaScriptが解釈する。)
      ...prev,
      [name]: value,
    }));
  };

  //⑤バリデーション処理
  const validate = () => {
    const newErrors = {};

    if (!formData.yourname.trim()) {
      //trim()とは「前後の空白を削除する」という意味。
      newErrors.yourname = 'お名前を入力してください';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    } else if (formData.message.length < 10) {
      newErrors.message = 'メッセージは10文字以上で入力してください';
    }

    return newErrors;
  };

  //⑥フォーム送信ボタンが押された時の処理
  const handleSubmit = (e) => {
    e.preventDefault();

    //⬇︎validationErrors にバリデーションの結果を入れる
    //バリデーションに失敗した場合、エラーメッセージを表示する
    const validationErrors = validate();
    setErrors(validationErrors);

    //⬇︎エラーがなければ「エラーなし」の処理
    //Object.keysは、「オブジェクトの中にどんな『キー(名前)』が存在するかを、配列にして集めてくれるJavaScriptの命令」。
    //Object.keys(validationErrors)➡️「validationErrors の中に何というエラー名（キー）があるか？」を配列として集める
    //(例: ['yourname', 'email'] や 空の [])というエラー名。
    // .length === 0 ➡️「validationErrorsの配列の個数が0個かどうか」を数える。
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  //Resetイベント。フォームをリセットする処理(もう一度送信するボタン用)
  //⑦送信完了画面(アーリーリターン)で使用する。
  // ➡️ <ContactSuccess onClick={Reset} />
  const Reset = () => {
    setIsSubmitted(false); //リセット時の処理
    setFormData({ yourname: '', email: '', message: '' }); //リセット時の処理
    setErrors({}); // リセット時はエラー情報も空にする
  };

  //⑦送信完了画面(アーリーリターン)
  //アーリーリターン ➡️ 送信フラグがtrueなら、後続の<form>のJSXを読み込ませずにサクッと先に下記を表示して終了します。
  //<form>はisSubmittedがfalse(初期表示orエラー)のときしか表示しない！
  if (isSubmitted) {
    return (
      <ContactSuccess onClick={Reset} /> //Resetイベント。フォームをリセットする処理(もう一度送信するボタン用)

      // ⬇︎ContactSuccess.jsxに責務分離
      // <div>
      //   <h2>送信が完了しました！</h2>
      //   <p>お問い合わせありがとうございました。</p>
      //   {/* もう一度送信するボタン */}
      //   <button
      //     onClick={() => {
      //       setIsSubmitted(false); //リセット時の処理
      //       setFormData({ yourname: '', email: '', message: '' }); //リセット時の処理
      //       setErrors({}); // リセット時はエラー情報も空にする
      //     }}
      //   >
      //     もう一度フォームに戻る
      //   </button>
      // </div>
    );
  }

  //⑧JSX
  return (
    <div>
      <h2>お問い合わせフォーム(バリデーション付き)</h2>

      <ContactForm formData={formData} onChange={handleChange} errors={errors} onSubmit={handleSubmit} />

      {/* ⬇︎ContactFormに責務分離 */}
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor='name'>お名前:</label>
        <input type='text' id='name' name='yourname' value={formData.yourname} onChange={handleChange} />
        {errors.yourname && <p style={{ color: 'red' }}>{errors.yourname}</p>}

        <label htmlFor='email'>メールアドレス</label>
        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label htmlFor='message'>メッセージ</label>
        <textarea id='message' name='message' value={formData.message} onChange={handleChange} />
        {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}

        <button type='submit'>送信する</button>
      </form> */}
    </div>
  );
};
