import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');  // Updated to use `username`
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Both fields are required');
      return;
    }

    try {
      setError('');
      const response = await axios.post('http://localhost:5000/api/login', { username, password }); // Use `username` here
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // Save token
        login(); // Update context to reflect that the user is logged in
        navigate('/collections'); // Redirect to CollectionsPage after login
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please check your credentials and try again.');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" sx={{ mt: 2 }}>
        <Card sx={{ padding: 2 }}>
          <CardContent sx={{ padding: 2 }}>
            <Typography variant="h6" component="h1" align="center">
              Login
            </Typography>
            {error && (
              <Typography color="error" align="center" sx={{ mb: 1 }}>
                {error}
              </Typography>
            )}
            <form onSubmit={handleLogin}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                type="text"  // Updated to `text`
                size="small"  // Updated to `small`
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // Updated to setUsername
              />
              <TextField
                margin="dense"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1, mb: 1, padding: '6px 0' }}
                size="small"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Login;
