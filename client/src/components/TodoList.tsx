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
    <div className="w-full max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-300/30 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-blue-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white/90 mb-2">Your Tasks</h1>
        <p className="text-blue-200/70">Organize your day efficiently</p>
      </div>

      <div className="flex gap-3 mb-8">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-300/70"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="w-full pl-10 pr-4 py-3 bg-blue-800/50 backdrop-blur-sm border border-blue-400/20 rounded-lg text-white/90 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 cursor-pointer bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 border border-blue-400/30 shadow-lg hover:shadow-blue-500/20 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add
        </button>
      </div>

      {editingTodo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-md bg-blue-800/80 backdrop-blur-lg p-6 rounded-xl border border-blue-400/30 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white/90 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Task
              </h2>
              <button
                onClick={() => setEditingTodo(null)}
                className="text-blue-300/70 cursor-pointer hover:text-blue-300 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 bg-blue-800/50 backdrop-blur-sm border border-blue-400/30 rounded-lg text-white/90 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-200"
            />

            <label className="flex items-center gap-3 mb-6 text-blue-200/90">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={editCompleted}
                  onChange={(e) => setEditCompleted(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center ${
                    editCompleted
                      ? "bg-blue-500"
                      : "bg-blue-800/50 border border-blue-400/30"
                  }`}
                >
                  {editCompleted && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span>Completed</span>
            </label>

            <div className="text-blue-200/60 text-sm mb-6">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Created: {new Date(editingTodo.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Updated: {new Date(editingTodo.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingTodo(null)}
                className="px-4 py-2 cursor-pointer bg-blue-800/50 hover:bg-blue-800/70 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 border border-blue-400/30"
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
                className="px-4 py-2 cursor-pointer bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 border border-blue-400/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-800/30 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-300/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white/90 mb-1">
              No tasks yet
            </h3>
            <p className="text-blue-200/60">
              Add your first task to get started
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="group backdrop-blur-sm bg-blue-800/50 hover:bg-blue-800/70 border border-blue-400/20 rounded-xl p-4 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggle(todo)}
                  className="mt-1 flex-shrink-0"
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center ${
                      todo.completed
                        ? "bg-blue-500"
                        : "bg-blue-800/50 border border-blue-400/30"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                <div className="flex-grow">
                  <div
                    className={`${
                      todo.completed ? "opacity-70 line-through" : "opacity-100"
                    } text-white/90`}
                  >
                    {todo.title}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-blue-300/60 mt-1">
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {new Date(todo.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="p-1.5 cursor-pointer text-blue-300 hover:text-blue-200 hover:bg-blue-800/50 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="p-1.5 cursor-pointer text-red-400 hover:text-red-300 hover:bg-blue-800/50 rounded-lg transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
