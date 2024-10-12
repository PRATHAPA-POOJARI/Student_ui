import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from './Header';

const ListCollection = () => {
  const [collections, setCollections] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const { databaseName } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/collections/${databaseName}`)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => console.error('Error fetching collections:', error));
  }, [databaseName]);

  const handleCollectionClick = (collectionName) => {
    axios
      .get(`http://localhost:5000/api/collections/${databaseName}/${collectionName}`)
      .then((response) => {
        setCollectionData(response.data);
        setSelectedCollection(collectionName);
        setOpenDialog(true);
      })
      .catch((error) => console.error('Error fetching collection data:', error));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCollectionData([]);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setOpenEditDialog(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    if (!editData._id || !/^[a-fA-F0-9]{24}$/.test(editData._id)) {
      console.error('Invalid document ID');
      alert('Invalid document ID');
      return;
    }

    axios
      .put(`http://localhost:5000/api/collections/${databaseName}/${selectedCollection}/${editData._id}`, editData)
      .then((response) => {
        setCollectionData((prevData) =>
          prevData.map((item) => (item._id === editData._id ? response.data : item))
        );
        setOpenEditDialog(false);
        setEditData({});
      })
      .catch((error) => {
        console.error('Error updating item:', error);
        alert('Error updating item');
      });
  };

  const handleDeleteClick = (id) => {
    setSelectedItemToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItemToDelete) {
      axios
        .delete(`http://localhost:5000/api/collections/${databaseName}/${selectedCollection}/${selectedItemToDelete}`)
        .then((response) => {
          setCollectionData((prevData) => prevData.filter((item) => item._id !== selectedItemToDelete));
          setOpenDeleteDialog(false);
          setSelectedItemToDelete(null);
        })
        .catch((error) => {
          console.error('Error deleting item:', error);
          alert('Error deleting item');
        });
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedItemToDelete(null);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditData({});
  };

  const renderTableHeaders = () => {
    if (collectionData.length > 0) {
      const keys = Object.keys(collectionData[0]).filter((key) => key !== '_id');
      return keys.map((key) => <TableCell key={key}>{key}</TableCell>);
    }
    return null;
  };

  const renderTableRows = () => {
    return collectionData.map((item) => (
      <TableRow key={item._id}>
        {Object.keys(item)
          .filter((key) => key !== '_id')
          .map((key) => (
            <TableCell key={key}>
              {typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key]}
            </TableCell>
          ))}
        <TableCell>
          <IconButton onClick={() => handleEditClick(item)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(item._id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Header />
      <Box sx={{ textAlign: 'center', backgroundColor: '#d5d5ff', minHeight: '100vh', padding: '20px' }}>
        <h1>Collections in {databaseName}</h1>
        <div style={styles.cardContainer}>
          {collections.length > 0 ? (
            collections.map((name, index) => (
              <div key={index} style={{ ...styles.card, marginLeft: '4rem' }}>
                <h5>{name}</h5>
                <button style={styles.button} onClick={() => handleCollectionClick(name)}>
                  View Collection
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#fff' }}>No collections available.</p>
          )}
        </div>

        {/* Dialog for displaying collection data */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="lg">
          <DialogTitle>Data in {selectedCollection}</DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {renderTableHeaders()}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderTableRows()}</TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this item?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            {Object.keys(editData).map((key) =>
              key !== '_id' ? (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  value={editData[key]}
                  onChange={handleEditChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  variant="outlined"
                />
              ) : null
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditSave} color="primary">
              Update
            </Button>
            <Button onClick={handleCloseEditDialog} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    borderRadius: '25px',
    background: '#6fb7ff',
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
    cursor: 'pointer',
  },
};

export default ListCollection;
