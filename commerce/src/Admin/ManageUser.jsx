// src/Admin/ManageUsers.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
