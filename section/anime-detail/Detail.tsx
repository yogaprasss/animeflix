import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { FavoriteAnime } from '@/lib/storage/favoriteAnime';

import type { AnimeDetailProps } from '@/models/anime';

const List = ({
  id,
  bannerImage,
  coverImage,
  title,
  startDate,
  episodes,
  duration,
  averageScore,
  genres,
  description,
}: AnimeDetailProps) => {
  let episodeString = 'Still ongoing';
  if (episodes === 1) episodeString = `${duration} min`;
  else if (episodes !== null) episodeString = `${episodes} episodes`;

  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);

  const addToFavorite = () => {
    const favoriteAnime = new FavoriteAnime();
    if (!favoriteAnime.get().includes(Number(id))) {
      favoriteAnime.save(Number(id));
      setIsAddedToFavorite(true);
    }
  };

  useEffect(() => {
    const favoriteAnime = new FavoriteAnime();
    if (favoriteAnime.get().includes(Number(id))) setIsAddedToFavorite(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box maxWidth={1040}>
      {/* Banner */}
      <Box position='relative' width='100%' height='250px'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerImage}
          alt='banner'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Quick Info */}
      <Box display='flex' marginTop='2rem'>
        <Box position='relative' width='100px' height='160px'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage.large}
            alt='cover'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Box marginLeft='1rem'>
          <Typography variant='h5'>{title.userPreferred}</Typography>
          <Typography variant='body1'>{startDate.year}</Typography>
          <Typography variant='body1'>
            {episodeString}
          </Typography>
          <Box display='flex' alignItems='center'>
            <Star sx={{ color: 'yellow', marginRight: '8px' }} />
            <Typography variant='body1'>
              {averageScore}/100
            </Typography>
          </Box>
          <Typography variant='body1'>
            Genre: {JSON.stringify(genres).replace(/\"|\[|\]/g, '').replace(/\,/g, ', ')}
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
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Box>
    </Box>
  );
};

export default List;