import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from 'hooks/useAuth';
import useInput from 'hooks/useInput';

export default function Home() {
  const { login } = useAuth();
  const { input, handleChange } = useInput({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    login(input);
  };

  const disabledLoginBtn = Object.values(input).some((value) => !value);

  return (
    <div className="grid place-content-center h-screen bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="py-6 px-8 rounded-lg bg-slate-300 flex flex-col gap-2 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={handleChange}
            className="rounded-md py-1 px-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            className="rounded-md py-1 px-2"
          />
        </div>

        <button
          disabled={disabledLoginBtn}
          className={`px-4 py-2 rounded-md mt-2 ${
            disabledLoginBtn ? 'bg-slate-200' : 'bg-red-500'
          }`}>
          Login
        </button>
      </form>
    </div>
  );
}
