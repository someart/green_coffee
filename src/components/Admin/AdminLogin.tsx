import { useState } from 'react';

interface AdminLoginProps {
  onLogin: (isAuthenticated: boolean) => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') {
      onLogin(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
