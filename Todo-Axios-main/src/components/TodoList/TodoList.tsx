import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoForm from "../TodoForm/TodoForm";
import BasicSpinner from "../BasicSpinner/BasicSpinner";
import axios from "axios";
import TodoItem from "../TodoItem/TodoItem";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

export interface Todo {
    _id: string,
    name: string,
    status: string,
    priority: string,
    description: string
    }


const TodoList: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const getTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get<Todo[]>(BASE_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("error featching data", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);

  const addTodo = async (name: string, status: string, priority:string, description: string): Promise<void> => {
    try {
      const response = await axios.post<Todo>(BASE_URL, {
        name: name,
        status: status,
        priority: priority,
        description: description
      });
      getTodo();
    } catch (error) {
      console.error("cant add todo", error);
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      getTodo();
    } catch (error) {
      console.error("cant delete todo", error);
    }
  };
  const toggleCompletion = async (id: string): Promise<void> => {
    try {
      const singleTodo: Todo | undefined = todos.find((todo) => todo._id === id);
      if (!singleTodo) {
        throw new Error("cant find todo with this id");
      }
      await axios.put<Todo>(`${BASE_URL}/${id}`, {
        ...singleTodo,
      });
      getTodo();
    } catch (error) {
      console.error("cant toogle todo", error);
    }
  };

  return (
    <div className="todo-list">
      <h1>ToDo List</h1>
      <TodoForm addTodo={addTodo} />
      <ul>
        {isLoading ? (
          <BasicSpinner />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              deleteTodo={deleteTodo}
              todo={todo}
              toggleCompletion={toggleCompletion}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
