import Link from 'next/link';

import { Box, Button, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

import type { AnimeProps } from '@/models/anime';

interface AnimeCardProps extends AnimeProps {
  isFavorite?: boolean;
}

const AnimeCard = ({ id, title, coverImage, isFavorite }: AnimeCardProps) => {
  return (
    <Link href={`/anime/${id}`} passHref>
      <Box width='100%' height='350px'>
        <Box position='relative' width='100%' height='250px'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage.large}
            alt='cover'
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <br />
        <Typography variant='subtitle1'>
          {title.userPreferred}
        </Typography>
      </Box>
    </Link>
  );
};

export default AnimeCard;
