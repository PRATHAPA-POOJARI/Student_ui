import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Layout/Header';

function Register() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic Client-Side Validation
    if (!name || !password || !email || !phone) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      // Use the correct API endpoint
      await axios.post('http://localhost:9000/spk/signup', {
        name,
        password,
        email,
        phone,
      });
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
      <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" component="h1" align="center" sx={{ mb: 3 }}>
              Register
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, py: 1.5 }}
              >
                Register
              </Button>
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
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
