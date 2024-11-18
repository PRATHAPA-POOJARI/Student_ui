import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Client-Side Validation
    if (!username || !password || !email || !phone) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      await axios.post('http://localhost:9000/api/register', { username, password, email, phone });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" sx={{ mt: 15, px: 1 }}>
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
                id="email"
                label="Email"
                name="email"
                type="email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              {errorMessage && (
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
                <Link to="/login" style={{ textDecoration: 'none', color: 'primary' }}>
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
