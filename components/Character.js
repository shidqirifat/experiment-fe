import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Character({ character }) {
  return (
    <Link
      href={`/characters/${character.id}`}
      className="rounded-md shadow-md bg-blue-800 flex gap-3 px-4 py-3">
      <div>
        <Image
          src={character.image}
          alt={character.name}
          width={80}
          height={80}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2 text-left">
        <h2 className="text-white font-semibold text-xl leading-6">{character.name}</h2>
        <h3 className="text-slate-200 text-base leading-4">{character.species}</h3>
      </div>
    </Link>
  );
}
