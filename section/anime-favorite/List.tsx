import AnimeCard from '@/components/AnimeCard';

import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FavoriteAnime } from '@/lib/storage/favoriteAnime';

import type { AnimeProps } from '@/models/anime';

interface BodyRequest {
  page: number;
  genre?: string;
}

const List = () => {
  
  const [favoriteAnime, setFavoriteAnime] = useState<AnimeProps[]>([]);

  const fetchAPI = async (favoriteAnimeIds: number[]) => {
    const bodyRequest = {
      favoriteAnime: favoriteAnimeIds,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
    };

    const request = await fetch('/api/anime/favorite', options);
    const result = await request.json();

    if (result) {
      setFavoriteAnime(result.data);
    }
  };

  useEffect(() => {
    const favoriteAnimeIds = new FavoriteAnime();
    fetchAPI(favoriteAnimeIds.get());
  }, []);

  return (
    <Box maxWidth={1040} width='100%'>
      {favoriteAnime.length === 0 && (
        <Typography variant='h3'>
          No results
        </Typography>
      )}
      <Grid container spacing={4} height='100%' width='100%' paddingTop='3rem'>
        {favoriteAnime.map((anime, index) => (
          <Grid key={`anime-favorite-${index + 1}`} item xs={6} sm={4} md={3} lg={2}>
            <AnimeCard {...anime} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default List;