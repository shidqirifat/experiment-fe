import React from 'react';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';

export default function Home() {
  const { login } = useAuth();
  const { form, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    login(form);
  };

  const disabledLoginBtn = Object.values(form).some((value) => !value);

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
            value={form.email}
            onChange={handleChange}
            className="rounded-md py-1 px-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
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
