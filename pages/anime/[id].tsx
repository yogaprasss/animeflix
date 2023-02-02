import MainLayout from '@/components/MainLayout';
import Detail from '@/section/anime-detail/Detail';

import { animeDetailQuery } from '@/lib/queries/anime';

import type { GetServerSidePropsContext } from 'next';
import type { AnimeDetailProps } from '@/models/anime';

interface PageProps {
  detail: AnimeDetailProps;
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
  const variables = {
    id: Number(params?.id),
  };

  const url = 'https://graphql.anilist.co';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: animeDetailQuery,
      variables,
    }),
  };

  const request = await fetch(url, options);
  const result = await request.json();

  if (!result) return { props: {} }
  return {
    props: {
      detail: result.data.Media,
    }
  };
};

const AnimeDetail = ({ detail }: PageProps) => {
  return (
    <MainLayout>
      <Detail {...detail} />
    </MainLayout>
  )
};

export default AnimeDetail;