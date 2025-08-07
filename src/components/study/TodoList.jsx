//Todo.jsx

const TodoList = ({ todos, deleteTodo }) => {
  const complete = (id) => {
    deleteTodo(id);
  };

  return (
    <div>
      <h3>TodoList</h3>
      {todos.map((todo) => {
        return (
          <div key={todo.id}>
            <button onClick={() => complete(todo.id)}>完了</button>
            <span>{todo.content}</span>
          </div>
        );
      })}
    </div>
  );
};
export default TodoList;
