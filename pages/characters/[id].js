import { useQuery } from '@tanstack/react-query';
import useFetch from 'hooks/useFetch';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ENDPOINT = 'https://rickandmortyapi.com/api/character';

export default function Character() {
  const { fetch } = useFetch();
  const router = useRouter();
  const id = router.query?.id;

  const getCharacter = async () => {
    if (!id) return;

    const { data } = await fetch({
      type: 'GET',
      url: `${ENDPOINT}/${id}`,
      isExternalUrl: true
    });
    return data;
  };

  const { data: character, isInitialLoading } = useQuery({
    queryKey: ['characters', id],
    queryFn: getCharacter,
    keepPreviousData: true
  });

  if (isInitialLoading) return <h2>Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto my-32">
      <button
        onClick={router.back}
        className="text-lg leading-5 text-blue-600 font-medium rounded-md px-4 py-[6px] bg-blue-100 mb-6 inline-block">
        Back
      </button>
      <div className="flex gap-6">
        <div>
          <Image src={character.image} alt={character.name} width={240} height={800} />
        </div>
        <div>
          <h1 className="text-2xl text-black font-semibold leading-7">Detail Charater</h1>
          <h2 className="text-xl text-slate-800 font-medium leading-5 mt-4">
            Name: {character.name}
          </h2>
          <h2 className="text-lg text-slate-700 leading-4 mt-2">Species: {character.species}</h2>
          <h2 className="text-lg text-slate-700 leading-4 mt-2">Status: {character.status}</h2>
          <h2 className="text-lg text-slate-700 leading-4 mt-2">Gender: {character.gender}</h2>
          <h2 className="text-lg text-slate-700 leading-4 mt-2">
            Location: {character.location.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
