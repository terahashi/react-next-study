///pages/StudyHome.jsx
///⬇︎勉強したものの「リンクリストを追加していく。」
import { Link } from 'react-router-dom';

const StudyHome = () => {
  return (
    <div>
      <h1>Vite + React</h1>
      <h1>StudyHomeのトップページです。</h1>
      <Link to={'study/TodoApp'}>Todoアプリを作成してみよう</Link>
      <br></br>
      <Link to={'study/PostApp'}>(fetchテスト)APIデータ取得用のコンポーネントを作成してみよう</Link>
      <br></br>
      <Link to={'study/PostApp2'}>(fetchテスト2)画面が開いた瞬間に「データ取得中...」と表示され、1〜2秒後にサーバーから届いたユーザー一覧（名前・メール）が画面に並びます。</Link>
      <br></br>
      <Link to={'study/TabApp'}>タブ切り替え用のコンポーネントを作成してみよう</Link>
      <br></br>
      <Link to={'study/FormApp'}>バリデーション(入力値の検証)付きフォーム用のコンポーネントを作成してみよう</Link>
      <br></br>
      <Link to='/study/PostApp2'>FormApp.jsxの「バリデーション(入力値の検証)付きフォームを更に応用した」練習問題。</Link>
      <br></br>
      <Link to={'study/CardApp'}>カードコンポーネント(カードの高さが自動でピタッと揃い、ボタンが一番下に綺麗に整列するコンポーネント)を作成してみよう</Link>
      <br></br>
      <Link to={'study/AccordionApp'}>アコーディオンを作成(「質問」をクリックすると、その下にある「回答」を表示するコンポーネント)を作成してみよう</Link>
      <br></br>
      <Link to={'study/SearchFilterApp'}>リアルタイム検索フィルターを作成してみよう</Link>
      <br></br>
      <Link to='study/Count'>countの勉強ページ</Link>
      <br></br>
      <Link to='study/Count2'>count2の勉強ページ</Link>
      <br></br>
      <Link to='study/EventExample'>イベントリスナーの勉強ページ</Link>
      <br></br>
      <Link to={'study/EventExample2'}>イベントリスナーの勉強ページ2</Link>
      <br></br>
      <Link to={'study/ObjectState'}>オブジェクトのステートを更新しよう</Link>
      <br></br>
      <Link to={'study/ListKey'}>リストに「Key」を設定しよう</Link>
      <br></br>
      <Link to={'study/Filter'}>配列のフィルターメソッドの使い方</Link>
      <br></br>
      <Link to={'study/Filter2'}>配列のフィルターメソッドの使い方2</Link>
      <br></br>
      <Link to={'study/ConditionalBranch'}>条件分岐を設ける(if文、&&(論理AND演算子)、??(Null合体演算子)、３項演算子)</Link>
      <br></br>
      <Link to={'study/Refactor'}>コンポーネントのリファクタリング(整理)をしよう</Link>
      <br></br>
      <Link to={'study/InputTextarea'}>フォームの「InputとTextarea」を作成してみよう</Link>
      <br></br>
      <Link to={'study/Radio'}>ラジオボタンを作成してみよう</Link>
      <br></br>
      <Link to={'study/SingleCheckBox'}>シンプルなチェックボックスを作成してみよう</Link>
      <br></br>
      <Link to={'study/MultipleCheckBox'}>複数のチェックボックスを作成してみよう</Link>
      <br></br>
      <Link to={'study/Select'}>プルダウンボタンを作成する</Link>
      <br></br>
      <Link to={'study/CssInjs'}>Css In jsを練習してみよう</Link>
      <br></br>
      <Link to={'study/ModalLesson'}>モーダルを作成してみよう</Link>
      <br></br>
      <Link to={'study/ToastLesson'}>トーストを作成してみよう</Link>
      <br></br>
      <Link to={'study/UseRef'}>UseRefでDOMを直接操作する</Link>
    </div>
  );
};

export default StudyHome;
