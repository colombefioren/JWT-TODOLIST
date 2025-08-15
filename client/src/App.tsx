import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TodoList from "./components/TodoList";
import { logout } from "./services/auth";

export default function App() {
  const [userLogged, setUserLogged] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [showRegister, setShowRegister] = useState(false);

  if (!userLogged) {
    return (
      <div className="bg-pink-500 h-screen w-full flex flex-col items-center justify-center gap-4">
        {showRegister ? (
          <RegisterForm onRegister={() => setUserLogged(true)} />
        ) : (
          <LoginForm onLogin={() => setUserLogged(true)} />
        )}

        <button
          onClick={() => setShowRegister((prev) => !prev)}
          className="bg-blue-300 cursor-pointer p-2 rounded-md text-white hover:bg-green-300 transition-all duration-300"
        >
          {showRegister ? "Go to Login" : "Go to Register"}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-pink-500 h-screen w-full">
      <div className="p-4 flex justify-end gap-2">
        <button
          onClick={() => {
            logout();
            setUserLogged(false);
          }}
          className="bg-blue-300 p-2 rounded-md text-white hover:bg-green-300 transition-all duration-300"
        >
          Logout
        </button>
      </div>
      <TodoList />
    </div>
  );
}
