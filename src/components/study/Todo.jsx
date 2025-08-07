//TodoApp.jsx
import { useState } from 'react';

import TodoList from './TodoList';
import TodoForm from './TodoForm';

const Todo = () => {
  //⬇︎配列のオブジェクト達
  const todosList = [
    {
      id: 1,
      content: '店予約する',
    },
    {
      id: 2,
      content: '卵買う',
    },
    {
      id: 3,
      content: '郵便出す',
    },
  ];

  ////⬇︎todosListをuseStateで定義する。
  const [todos, setTodos] = useState(todosList);

  ////⬇︎deleteTodoをcomplete関数で使用する。
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    //⬇︎setTodosで「newTodoを更新(完了ボタンを押したら一致したidが削除される)」
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <TodoForm />
    </>
  );
};

export default Todo;
