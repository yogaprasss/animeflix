import AnimeCard from '@/components/AnimeCard';

import { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';

import type { AnimeProps } from '@/models/anime';

const List = () => {
  const [listAnime, setListAnime] = useState<AnimeProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchAPI = async (page?: number) => {
    setIsLoadMore(true);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ page }),
    };

    const request = await fetch('/api/animes', options);
    const result = await request.json();

    if (result.code === 200) {
      if (page === 1) {
        setListAnime(result.data.Page.media);
      } else {
        setListAnime((currentValue) => ([...currentValue, ...result.data.Page.media]));
      }
      setHasNextPage(result.data.Page.pageInfo.hasNextPage);
      setIsLoadMore(false);
    }
  };

  const onClickLoadMore = () => {
    setPage((currentValue) => (currentValue += 1));
  };

  useEffect(() => {
    fetchAPI(page);
  }, [page]);

  return (
    <Box maxWidth={1040}>
      <Grid container spacing={4} height='100%'>
        {listAnime.map((anime, index) => (
          <Grid key={`anime-${index + 1}`} item xs={6} sm={4} md={3} lg={2}>
            <AnimeCard {...anime} />
          </Grid>
        ))}
      </Grid>
      <Box width='100%' display='flex' justifyContent='center'>
        {hasNextPage && !isLoadMore && (
          <Button onClick={onClickLoadMore}>
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default List;