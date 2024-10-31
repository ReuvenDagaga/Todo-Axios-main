import React from "react";
import "./TodoItem.css";
import { Todo } from "../TodoList/TodoList";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => Promise<void>;
  toggleCompletion: (id: string) => Promise<void>;
}
const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  toggleCompletion,
}) => {
  return (
    <li className={`todo-item ${todo.status != "completed"} `}>
      <div className="todo-status-and-text" onClick={()=>toggleCompletion(todo._id)}>
        <span>{todo.status ? "✔️" : "❌"}</span>
        <span>{todo.description}</span>
      </div>
      <button onClick={()=>deleteTodo(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
