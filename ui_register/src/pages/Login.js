import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure AuthContext is implemented properly

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Extract login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error message
    setError('');

    if (!email || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      setLoading(true);

      // Make API call to backend
      const response = await axios.post('http://localhost:9000/spk/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;

        // Save token in AuthContext
        login(token);

        // Navigate to the home page after successful login
        navigate('/home');
      }
    } catch (err) {
      console.error(err);

      // Set error message based on response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Typography color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
