import { useState } from "react";
import { register } from "../services/auth";
import { useUserStore } from "../store/userStore";

export default function RegisterForm({
  onRegister,
}: {
  onRegister: () => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(email, name, password);
      setUser(data);
      onRegister();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-pink-400">
      <form
        onSubmit={handleSubmit}
        className="glass p-8 w-96 flex flex-col gap-4 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          🌸 Register 🌸
        </h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          className="p-2 rounded-md border border-white/50 bg-white/30 placeholder-white text-white"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="p-2 rounded-md border border-white/50 bg-white/30 placeholder-white text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="p-2 rounded-md border border-white/50 bg-white/30 placeholder-white text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-300 cursor-pointer hover:bg-green-300 text-white p-2 rounded-md transition-all duration-300">
          Register
        </button>
      </form>
    </div>
  );
}
