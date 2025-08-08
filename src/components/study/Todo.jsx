//TodoApp.jsx
import { useState } from 'react';

import TodoList from './TodoList';
import TodoForm from './TodoForm';

//⬇︎配列のオブジェクト達
const Todo = () => {
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

  ////⬇︎deleteTodoを「TodoList.jsxへ渡す。」
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos); //⬅︎setTodosで「newTodosを更新(完了ボタンを押したら一致したidが削除される)」
  };

  ////⬇︎createTodoを「TodoForm.jsxへ渡す。【追加ボタンで新しいidとcontentが作成される】。」
  const createTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <TodoForm createTodo={createTodo} />
    </>
  );
};

export default Todo;
