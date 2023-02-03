import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { FavoriteAnime } from '@/lib/storage/favoriteAnime';
import { animeDetailQuery } from '@/lib/queries/anime';

import type { AnimeDetailProps } from '@/models/anime';

const List = () => {
  const router = useRouter();
  const [anime, setAnime] = useState<AnimeDetailProps | null>(null);
  const fetchAPI = async () => {
    const variables = {
      id: router.query.id,
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
      setAnime(result.data.Media);
    }
  };

  let episodeString = 'Still ongoing';
  if (anime?.episodes === 1) episodeString = `${anime?.duration} min`;
  else if (anime?.episodes !== null) episodeString = `${anime?.episodes} episodes`;

  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);

  const addToFavorite = () => {
    const favoriteAnime = new FavoriteAnime();
    // if (!favoriteAnime.get().includes(Number(id))) {
    //   favoriteAnime.save(Number(id));
    //   setIsAddedToFavorite(true);
    // }
    if (!favoriteAnime.get().includes(Number(anime?.id))) {
      favoriteAnime.save(Number(anime?.id));
      setIsAddedToFavorite(true);
    }
  };

  useEffect(() => {
    const favoriteAnime = new FavoriteAnime();
    if (favoriteAnime.get().includes(Number(anime?.id))) setIsAddedToFavorite(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anime]);

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box maxWidth={1040}>
      {/* Banner */}
      <Box position='relative' width='100%' height='250px'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={anime?.bannerImage}
          alt='banner'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Quick Info */}
      <Box display='flex' marginTop='2rem'>
        <Box position='relative' width='100px' height='160px'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={anime?.coverImage.large}
            alt='cover'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box marginLeft='1rem'>
          <Typography variant='h5'>{anime?.title.userPreferred}</Typography>
          <Typography variant='body1'>{anime?.startDate.year}</Typography>
          <Typography variant='body1'>
            {episodeString}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Star sx={{ color: 'yellow', marginRight: '8px' }} />
            <Typography variant='body1'>
              {anime?.averageScore}/100
            </Typography>
          </Box>
          <Typography variant='body1'>
            Genre: {JSON.stringify(anime?.genres)?.replace(/\"|\[|\]/g, '').replace(/\,/g, ', ')}
          </Typography>
          <Button onClick={addToFavorite} sx={{ color: 'white' }}>
            {isAddedToFavorite
              ? <Favorite sx={{ marginRight: '4px' }} />
              : <FavoriteBorder sx={{ marginRight: '4px' }} />
            }
            {`${isAddedToFavorite ? 'Added' : 'Add'}`} to Favorite
          </Button>
        </Box>
      </Box>

      {/* Description */}
      <Box marginTop='1rem'>
        <Typography variant='h6'>
          Description
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: anime?.description ?? '' }} />
      </Box>
    </Box>
  );
};

export default List;