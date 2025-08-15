import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/todo";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data.todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTodo) return;
    await createTodo(newTodo);
    setNewTodo("");
    fetchTodos();
  };

  const handleToggle = async (todo: Todo) => {
    await updateTodo(todo.id, { completed: !todo.completed });
    fetchTodos();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="p-4 min-h-screen bg-pastelGreen flex flex-col items-center">
      <h1 className="text-3xl mb-4 font-bold text-white animate-bounce">
        🌈 Todos 🌈
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new cute todo..."
          className="p-2 rounded-md border border-white/50 bg-white/30 placeholder-white text-white"
        />
        <button
          onClick={handleAdd}
          className="bg-pink-300 cursor-pointer hover:bg-pastelBlue text-white p-2 rounded-md transition-all duration-300"
        >
          Add ✨
        </button>
      </div>

      <ul className="w-96 flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`glass p-2 flex justify-between items-center transition-all duration-300 
              ${
                todo.completed
                  ? "bg-pastelBlue/50 text-white"
                  : "bg-white/20 text-white"
              }`}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className="w-5 h-5 accent-pink-300 rounded transition-all duration-300"
              />
              <span
                className={`${
                  todo.completed ? "opacity-70 line-through" : "opacity-100"
                }`}
              >
                {todo.title}
              </span>
            </label>

            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-400 p-1 rounded-md hover:bg-red-500 transition-all duration-300"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
