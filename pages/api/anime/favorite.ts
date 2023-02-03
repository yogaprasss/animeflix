import { animeFavoriteQuery } from '@/lib/queries/anime';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { AnimeProps } from '@/models/anime';

interface Data {
  code: number;
  data: AnimeProps[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;

  const url = 'https://graphql.anilist.co';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: animeFavoriteQuery(body.favoriteAnime),
    }),
  };
  
  const request = await fetch(url, options);
  const result = await request.json();

  if (result) {
    const animes: AnimeProps[] = Object.values(result.data);
    res.status(200).json({
      code: 200,
      data: animes,
    });
  }
}
