import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
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
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center p-4">
        {showRegister ? (
          <RegisterForm onRegister={() => setUserLogged(true)} />
        ) : (
          <LoginForm onLogin={() => setUserLogged(true)} />
        )}

        <button
          onClick={() => setShowRegister((prev) => !prev)}
          className="mt-6 px-6 py-2 cursor-pointer bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 border border-blue-400/30 shadow-lg hover:shadow-blue-500/20"
        >
          {showRegister
            ? "Already have an account? Login"
            : "Need an account? Register"}
        </button>
        <Analytics />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute top-5 right-5 flex items-center gap-4 z-50">
        {user && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/70 flex items-center justify-center backdrop-blur-sm border border-blue-300/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-white/90 font-medium text-sm">
              {user.name}
            </span>
          </div>
        )}
        <button
          onClick={() => {
            logout();
            setUserLogged(false);
            setUser(null);
          }}
          className="px-4 py-2 cursor-pointer bg-red-600/70 hover:bg-red-600/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all duration-300 border border-red-400/30 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
      <TodoList />
      <Analytics />
    </div>
  );
}
