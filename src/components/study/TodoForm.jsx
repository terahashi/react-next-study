//Todo.jsx
import { useState } from 'react';
//⬇︎「nanoidライブラリ」でランダム値を作成する。
import { nanoid } from 'nanoid';

const TodoForm = ({ createTodo }) => {
  const [enterdTodo, setEnterdTodo] = useState('');

  ////⬇︎addTodoイベント。追加ボタンを押すと【新しくidとcontentが追加されるイベント】を作成する。
  const addTodo = (e) => {
    e.preventDefault(); //⬅︎<form>タグのデフォルト機能の「ページ遷移機能停止」

    //⬇︎①idにはランダム数字、contentにはinputVal(form追加ボタンの文字)が入る。
    const newTodo = {
      //id: Math.floor(Math.random() * 1e5), //⬅︎一般的名ランダム値を作成する書き方。
      id: nanoid(),
      content: enterdTodo,
    };
    console.log(newTodo.id); //⬅︎コンソールにランダム値が出力される。(追加のボタンを押してから)

    createTodo(newTodo); //⬅︎②Todo.jsxから渡ってきた「createTodo関数」で【新しくidとcontentが追加される】

    setEnterdTodo(''); //⬅︎③「②」で追加された後に【input欄の中を空っぽにする。】
  };

  return (
    <>
      <div>
        <form onSubmit={addTodo}>
          <h3>TodoForm</h3>
          <input type='text' value={enterdTodo} onChange={(e) => setEnterdTodo(e.target.value)} />

          <button>追加</button>
          <span>{enterdTodo}</span>
        </form>
      </div>
    </>
  );
};
export default TodoForm;
