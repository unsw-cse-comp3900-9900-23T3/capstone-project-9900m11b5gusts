/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';

export default function HeroLeft01() {
  return (
    <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        Panda Exchange Hub
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Woolworths/Coles Collectables Exchange Hub
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        A platform for customers to trade and exchange collectibles with each other
      </Typography>
      <Button component="a" href='login' size="lg" endDecorator={<ArrowForward fontSize="xl" />} 
        style={{width: '150px'}}
      >
          Login
      </Button>
      <Button component="a" href='register' size="lg" endDecorator={<ArrowForward fontSize="xl" />} 
        style={{width: '150px'}}
      >
        Register
      </Button>


      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
      </Typography>
    </TwoSidedLayout>
  );
}