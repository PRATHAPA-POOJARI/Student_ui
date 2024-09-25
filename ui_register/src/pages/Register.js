import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    try {
      await axios.post('http://localhost:5000/api/register', { username, password, email });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      // Display specific error message from server if available
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <>
      <Header/>
      <Container component="main" maxWidth="xs" sx={{ mt: 2, px: 1 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" component="h1" align="center" sx={{ mb: 1 }}>
              Register
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                margin="dense"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorMessage && ( // Display error message if exists
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 1.5, py: 1 }}
              >
                Register
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 1.5 }}>
                Already have an account?{' '}
                <Link href="/login" underline="hover">
                  Login
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default Register;
