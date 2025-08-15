import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../services/todo";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);

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

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    setEditCompleted(todo.completed);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="pt-20 min-h-screen bg-pastelGreen flex flex-col items-center">
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
      {editingTodo && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-purple-400/80 p-6 rounded-2xl w-80 flex flex-col gap-4 relative">
            <h2 className="text-white font-bold text-xl">Edit Todo ✨</h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="p-2 rounded-md text-black"
            />

            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={editCompleted}
                onChange={(e) => setEditCompleted(e.target.checked)}
                className="w-5 h-5 accent-pink-300 rounded"
              />
              Completed
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingTodo(null)}
                className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await updateTodo(editingTodo.id, {
                    title: editTitle,
                    completed: editCompleted,
                  });
                  setEditingTodo(null);
                  fetchTodos();
                }}
                className="bg-pink-300 cursor-pointer hover:bg-pastelBlue text-white p-2 rounded-md transition-all duration-300"
              >
                Save
              </button>
            </div>

            <div className="text-white/70 text-sm mt-2">
              Created: {new Date(editingTodo.createdAt).toLocaleDateString()}{" "}
              <br />
              Last updated:{" "}
              {new Date(editingTodo.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      )}

      <ul className="w-96 flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="glass p-2 flex justify-between items-center transition-all duration-300"
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className="w-5 h-5 accent-pink-300 rounded"
              />
              <span
                className={`${
                  todo.completed ? "opacity-70 line-through" : "opacity-100"
                }`}
              >
                {todo.title}
              </span>
              <div className="text-white/70 text-xs mt-1">
                Created: {new Date(todo.createdAt).toLocaleDateString()} |
                Updated: {new Date(todo.updatedAt).toLocaleDateString()}
              </div>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-400 p-1 cursor-pointer rounded-md hover:bg-red-500 transition-all duration-300"
              >
                ❌
              </button>
              <button
                onClick={() => handleEdit(todo)}
                className="bg-yellow-300 p-1 cursor-pointer rounded-md hover:bg-yellow-400 transition-all duration-300"
              >
                ✏️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
