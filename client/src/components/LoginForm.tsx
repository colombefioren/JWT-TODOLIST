import { useState } from 'react';
import { login } from '../services/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pastelPink">
      <form onSubmit={handleSubmit} className="glass p-8 w-96 flex flex-col gap-4 animate-fade-in">
        <h2 className="text-2xl font-bold text-white text-center">💖Login 💖</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          className="p-2 rounded-md border border-white/50 bg-white/30 placeholder-white text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="p-2 rounded-md border border-white/50 bg-white/30 placeholder-white text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="bg-pastelBlue hover:bg-pastelGreen text-white p-2 rounded-md transition-all duration-300">
          Login
        </button>
      </form>
    </div>
  );
}
