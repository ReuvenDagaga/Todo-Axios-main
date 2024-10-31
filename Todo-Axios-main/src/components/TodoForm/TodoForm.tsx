import React, { useState } from "react";
import "./TodoForm.css";


interface TodoFormProps {
  addTodo: (name: string, status: string, priority:string, description: string) => Promise<void>;
}
const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!description.trim()) {
      return;
    }
    addTodo( name, status, priority, description);
    setDescription("");
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name: "/>
      <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
      <option value="">Select Status</option>

        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select name="" id="" onChange={(e) => setPriority(e.target.value)}>
      <option value="">Select Priority</option>

        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description: "/>
      <button type="submit" onClick={() => addTodo(name, status, priority, description)}>Add</button>
    </form>
  );
};

export default TodoForm;
