import { useDidUpdate, usePrevious } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import Button from 'components/Button';
import Character from 'components/Character';
import useDebounce from 'hooks/useDebounce';
import useFetch from 'hooks/useFetch';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ENDPOINT = 'https://rickandmortyapi.com/api/character';

export default function characters() {
  const router = useRouter();
  const { fetch } = useFetch();
  const [page, setPage] = useState(null);
  const [name, setName] = useState('');
  const debaunceKeyword = useDebounce(name, 1000);
  const prevKeyword = usePrevious(router.query?.keyword || debaunceKeyword || '');

  const handleChangeKeyword = (e) => setName(e.target.value);

  const getCharacters = async () => {
    if (!router.isReady) return;

    router.push({ query: { page, keyword: name } }, undefined, { scroll: false });
    const { data } = await fetch({
      type: 'GET',
      url: ENDPOINT,
      params: {
        page,
        name
      },
      isExternalUrl: true
    });

    return data;
  };

  const { data: characters, isInitialLoading } = useQuery({
    queryKey: ['characters', { page, name: debaunceKeyword }],
    queryFn: getCharacters,
    keepPreviousData: true,
    enabled: !!page
  });

  useEffect(() => {
    if (!router.isReady) return;

    setPage(Number(router.query?.page) || 1);
    setName(router.query?.keyword || '');
  }, [router]);

  useDidUpdate(() => {
    if (prevKeyword === debaunceKeyword) return;

    setPage(1);
  }, [debaunceKeyword]);

  if (!router.isReady || isInitialLoading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="mt-16 mb-6 mx-20">
        <input
          type="text"
          placeholder="Search by name..."
          value={name}
          onChange={handleChangeKeyword}
          className="border border-slate-400 w-80 mx-auto block rounded-md py-1 px-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mx-20">
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
