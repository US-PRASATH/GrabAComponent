import React, { useState } from 'react';
import API_BASE_URL from '../api/api';


const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      localStorage.setItem('jwt', data.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3]">
      <form
        className="bg-white p-10 rounded-2xl shadow-lg flex flex-col gap-5 min-w-[320px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[#2d3a4b] mb-2 font-bold text-2xl text-center">Login</h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="px-4 py-3 border border-[#d1d9e6] rounded-lg text-base focus:outline-none focus:border-[#6a82fb]"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="px-4 py-3 border border-[#d1d9e6] rounded-lg text-base focus:outline-none focus:border-[#6a82fb]"
        />
        {error && (
          <div className="text-[#fc5c7d] text-center text-base">{error}</div>
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-[#6a82fb] to-[#fc5c7d] text-white rounded-lg py-3 text-lg font-semibold hover:from-[#fc5c7d] hover:to-[#6a82fb] transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
