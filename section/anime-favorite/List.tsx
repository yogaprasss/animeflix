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
    <Box maxWidth={1040}>
      <Grid container spacing={4} height='100%' paddingTop='6rem'>
        {favoriteAnime.length === 0 && (
          <Typography variant='h3'>
            No results
          </Typography>
        )}
        {favoriteAnime.map((anime, index) => (
          <Grid key={`anime-${index + 1}`} item xs={6} sm={4} md={3} lg={2}>
            <AnimeCard {...anime} />
          </Grid>
        ))}
      </Grid>
      {/* <Box width='100%' display='flex' justifyContent='center'>
        {hasNextPage && !isLoadMore && (
          <Button onClick={onClickLoadMore}>
            Load More
          </Button>
        )}
      </Box> */}
    </Box>
  );
};

export default List;