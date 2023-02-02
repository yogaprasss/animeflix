import { animeDetailQuery } from '@/lib/queries/anime';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { PageProps } from '@/models/page';

interface Data {
  code: number;
  data: PageProps;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { body } = req;

  const variables = {
    id: body.id,
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

  if (result) {
    res.status(200).json({
      code: 200,
      data: result.data,
    });
  }
}
