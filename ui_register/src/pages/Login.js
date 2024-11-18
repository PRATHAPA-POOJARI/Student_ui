import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      if (response.status === 200) {
        const token = response.data.token;
        login(token); // Call login from context
        navigate('/home'); // Navigate after login
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h6">Login</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
