import React from 'react';

export default function Button({ disabled, onClick, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        disabled ? 'bg-blue-200' : 'bg-blue-600'
      } text-white text-xl font-medium w-28 py-2 rounded-md`}>
      {children}
    </button>
  );
}
