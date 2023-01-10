import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { getSessions } from '../utils/auth';

export default function Users() {
  const [user, setUser] = useState('');
  const { logout } = useAuth();

  useEffect(() => setUser(getSessions().firstname));

  return (
    <div className="grid place-content-center h-screen bg-slate-100">
      <div className="flex flex-col gap-4">
        <h1>Hello, {user}</h1>
        <button onClick={logout} className="px-4 py-2 rounded-md mt-2 bg-red-500">
          Logout
        </button>
      </div>
    </div>
  );
}
