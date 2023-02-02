import AnimeCard from '@/components/AnimeCard';

import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import type { AnimeProps } from '@/models/anime';

interface BodyRequest {
  page: number;
  genre?: string;
}

const List = () => {
  const [listAnime, setListAnime] = useState<AnimeProps[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [filterGenre, setFilterGenre] = useState('');

  const fetchAPI = async (page: number) => {
    setIsLoadMore(true);
    const bodyRequest: BodyRequest = { page };
    if (filterGenre) bodyRequest.genre = filterGenre;
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(bodyRequest),
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
    if (hasNextPage) setPage((currentValue) => (currentValue += 1));
  };

  const onInputFilterGenre = (e: any) => {
    setFilterGenre(e.target.value);
  };

  const onFilterByGenre = () => {
    setPage(1);
    fetchAPI(page);
  };

  const onPressEnter = (e: any) => {
    if (e.keyCode === 13) onFilterByGenre();
  };

  useEffect(() => {
    fetchAPI(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (!filterGenre) fetchAPI(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterGenre, page])

  return (
    <Box maxWidth={1040}>
      <Box
        width='100%'
        bgcolor='black'
        display='flex'
        alignItems='center'
        position='fixed'
        paddingY='1rem'
        zIndex={998}
      >
        <Typography>
          Filter
        </Typography>
        <input
          value={filterGenre}
          onChange={onInputFilterGenre}
          type='text'
          placeholder='Type any genre'
          onKeyDown={onPressEnter}
          style={{
            background: 'transparent',
            border: '1px solid white',
            padding: '8px',
            marginLeft: '12px',
          }}
        />
        <Button
          onClick={onFilterByGenre}
          sx={{ color: '#d55e0e', background: '#333' }}
        >
          Filter by genre
        </Button>
      </Box>
      <Grid container spacing={4} height='100%' paddingTop='6rem'>
        {listAnime.length === 0 && (
          <Typography variant='h3'>
            No results
          </Typography>
        )}
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