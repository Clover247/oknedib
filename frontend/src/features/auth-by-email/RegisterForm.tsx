import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { useRegisterMutation } from '../../shared/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../app/store';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('SPECIALIST'); // Default role
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const { accessToken, user } = await register({ email, password, firstName, lastName, role }).unwrap();
      dispatch(setCredentials({ token: accessToken, user }));
      navigate('/projects'); // Redirect to projects page on successful registration
    } catch (err: any) {
      setError(err.data?.message || 'Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="given-name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="family-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={role}
          label="Role"
          onChange={(e) => setRole(e.target.value as string)}
        >
          <MenuItem value={"ADMIN"}>Admin</MenuItem>
          <MenuItem value={"MANAGER"}>Manager</MenuItem>
          <MenuItem value={"CONTENT_MAKER"}>Content Maker</MenuItem>
          <MenuItem value={"SPECIALIST"}>Specialist</MenuItem>
        </Select>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
