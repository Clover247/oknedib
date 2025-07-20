import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('SPECIALIST'); // Default role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    // Here you would dispatch your Redux thunk for registration
    console.log('Register attempt with:', { email, password, firstName, lastName, role });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (email !== 'existing@example.com') {
      console.log('Registration successful');
    } else {
      setError('User with this email already exists');
    }
    setLoading(false);
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
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
