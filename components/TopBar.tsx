import Image from 'next/image';
import Link from 'next/link';

import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const TopBar = () => {
  return (
    <Box
      padding='12px'
      width='100%'
      height='60px'
      display='flex'
      justifyContent='center'
      position='fixed'
      zIndex={999}
      style={{ background: 'black' }}
    >
      <Box
        width='100%'
        maxWidth='1200px'
        display='flex'
        alignItems='center'
      >
        <Image src='/assets/logo.png' alt='logo' height={40} width={190} />
        <Link
          href='/'
          passHref
          style={{ marginLeft: '12px' }}
        >
          <Typography variant='h6'>
            List
          </Typography>
        </Link>
        <Link
          href='/favorite'
          passHref
          style={{ marginLeft: '12px' }}
        >
          <Typography variant='h6'>
            Favorite
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default TopBar;