import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import AddUserForm from './AddUserForm';
import styled from 'styled-components';

const UserListStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      setError('Ошибка при загрузке пользователей');
      clearErrorMessage();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearErrorMessage = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const addUser = async (user) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      setUsers([response.data, ...users]);
    } catch (error) {
      setError('Ошибка при добавлении пользователя');
      clearErrorMessage();
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error(error); // Log the error for debugging
      // Even if the API call fails, remove the user locally
      setUsers(users.filter(user => user.id !== id));
      setError('Ошибка при удалении пользователя');
      clearErrorMessage();
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
    } catch (error) {
      console.error(error); // Log the error for debugging
      // Update the state locally even if the API call fails
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
      setError('Ошибка при обновлении пользователя');
      clearErrorMessage();
    }
  };

  return (
    <UserListStyled>
      <AddUserForm addUser={addUser} />
      {error && <p>{error}</p>}
      {users.map(user => (
        <UserCard key={user.id} user={user} deleteUser={deleteUser} updateUser={updateUser} />
      ))}
    </UserListStyled>
  );
};

export default UserList;
