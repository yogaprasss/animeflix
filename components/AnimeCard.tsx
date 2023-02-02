import Image from 'next/image';

import { Box, Button, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import type { AnimeProps } from '@/models/anime';

interface AnimeCardProps extends AnimeProps {
  isFavorite?: boolean;
}

const AnimeCard = ({ title, coverImage, isFavorite }: AnimeCardProps) => {
  return (
    <Box width='100%' height='350px'>
      <Box position='relative' width='100%' height='180px'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverImage.large}
          alt='cover'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <br />
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='subtitle1'>
          {title.userPreferred}
        </Typography>
        <Button style={{ minWidth: '24px', padding: 0, height: '24px', color: 'white' }}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </Button>
      </Box>
    </Box>
  );
};

export default AnimeCard;
