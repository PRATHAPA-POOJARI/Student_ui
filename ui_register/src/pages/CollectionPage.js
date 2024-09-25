import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';

const CollectionsPage = () => {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/databases')
      .then(response => {
        setDatabases(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching database names');
        setLoading(false);
        console.error('Error fetching database names:', error);
      });
  }, []);

  const handleDatabaseSelect = (databaseName) => {
    navigate(`/collections/${databaseName}`);
  };

  return (
    <>
      <Header />
      <Box sx={{ 
        textAlign: 'center', 
        backgroundColor: '#d5d5ff', 
        minHeight: '100vh', 
        padding: '20px'
      }}>
        <Typography variant="h4">Select a Database</Typography>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
          <div style={styles.cardContainer}>
            {databases.length > 0 ? (
              databases.map((name, index) => (
                <div key={index} style={{ ...styles.card, marginLeft: '3rem' }}>
                  <Typography variant="h6">{name}</Typography>
                  <button style={styles.button} onClick={() => handleDatabaseSelect(name)}>
                    Select Database
                  </button>
                </div>
              ))
            ) : (
              <Typography>No databases available.</Typography>
            )}
          </div>
        )}
      </Box>
    </>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    borderRadius: '25px',
    background: '#a4a4ff',
    boxShadow: '6px 6px 42px #7e7ec4, -6px -6px 42px #cacaff',
    border: '1px solid #ddd',
    padding: '16px',
    width: '200px',
    textAlign: 'center',
    margin: '10px',
  },
  button: {
    marginTop: '10px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }
};

export default CollectionsPage;
