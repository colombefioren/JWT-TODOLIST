import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TodoList from "./components/TodoList";
import { logout } from "./services/auth";
import { useUserStore } from "./store/userStore";

export default function App() {
  const [userLogged, setUserLogged] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [showRegister, setShowRegister] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);


  useEffect(() => {
    if (userLogged && !user) {
      const storedUser = localStorage.getItem("user-storage");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.state.user) {
            setUser(parsedUser.state.user);
          }
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }
    }
  }, [userLogged, user, setUser]);

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
    <div className="bg-pink-500 w-full relative">
      <div className="absolute top-5 right-5 flex items-center gap-5">
        {user && (
          <>
            <span className="text-white font-bold">
              {user.name.toUpperCase()}
            </span>
          </>
        )}
        <button
          onClick={() => {
            logout();
            setUserLogged(false);
            setUser(null);
          }}
          className="bg-blue-300 cursor-pointer p-2 rounded-md text-white hover:bg-green-300 transition-all duration-300"
        >
          Logout
        </button>
      </div>
      <TodoList />
    </div>
  );
}
