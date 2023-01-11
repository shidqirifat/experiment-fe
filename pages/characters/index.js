import { useQuery } from '@tanstack/react-query';
import Button from 'components/Button';
import Character from 'components/Character';
import useFetch from 'hooks/useFetch';
import React, { useState } from 'react';

const ENDPOINT = 'https://rickandmortyapi.com/api/character';

export default function characters() {
  const { fetch } = useFetch();
  const [page, setPage] = useState(1);

  const getCharacters = async () => {
    const { data } = await fetch({
      type: 'GET',
      url: ENDPOINT,
      params: {
        page
      },
      isExternalUrl: true
    });
    return data;
  };

  const { data: characters, isInitialLoading } = useQuery({
    queryKey: ['characters', page],
    queryFn: getCharacters,
    keepPreviousData: true
  });

  if (isInitialLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mx-20 mt-16">
        {characters?.results?.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </div>
      <div className="flex gap-4 justify-center mt-6 mb-20">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Button disabled={page === characters?.info.pages} onClick={() => setPage(page + 1)}>
          Next
        </Button>
      </div>
    </>
  );
}
