import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import LoginForm from '@/features/auth-by-email/LoginForm';

const LoginPage: React.FC = () => {
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
          Sign in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
