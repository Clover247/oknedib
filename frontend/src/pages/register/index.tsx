import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import RegisterForm from '@/features/auth-by-email/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <RegisterForm />
      </Box>
    </Container>
  );
};
