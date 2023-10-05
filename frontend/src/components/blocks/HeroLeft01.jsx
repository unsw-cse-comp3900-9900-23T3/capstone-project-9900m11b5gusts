/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './TwoSidedLayout';

export default function HeroLeft01({handleSignInPage, handleSignUpPage}) {
  return (
    <TwoSidedLayout>
      <Typography color="primary" fontSize="lg" fontWeight="lg">
        Coles & Woolworlths
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        A large headlinerer about our product features & services
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        A descriptive secondary text placeholder. Use it to explain your business
        offer better.
      </Typography>
      <Button size="lg" onClick={handleSignUpPage} endDecorator={<ArrowForward fontSize="xl" />}>
        Create a new Count
      </Button>
      <Typography>
        Already a member? <Link fontWeight="lg" onClick={handleSignInPage}>Sign in</Link>
      </Typography>

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