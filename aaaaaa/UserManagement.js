// client/src/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const addUser = () => {
    axios.post('http://localhost:5000/api/users', { id: Date.now().toString(), name })
      .then(response => {
        setUsers([...users, response.data]);
        setName('');
      })
      .catch(error => console.error('Error adding user:', error));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const updateUser = (id) => {
    axios.put(`http://localhost:5000/api/users/${id}`, { id, name })
      .then(response => {
        setUsers(users.map(user => (user.id === id ? response.data : user)));
        setName('');
        setId('');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>
      <h1>User Management</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={id ? () => updateUser(id) : addUser}>
        {id ? 'Update User' : 'Add User'}
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => { setId(user.id); setName(user.name); }}>
              Edit
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;
