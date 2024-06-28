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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addUser = async (user) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
      setUsers([response.data, ...users]);
    } catch (error) {
      setError('Ошибка при добавлении пользователя');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError('Ошибка при удалении пользователя');
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      // Mock API does not actually update, so we update the state manually
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
    } catch (error) {
      console.error(error); // Log the error for debugging
      // Update the state locally even if the API call fails
      setUsers(users.map(user => (user.id === id ? { ...user, ...updatedUser } : user)));
      setError('Ошибка при обновлении пользователя');
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
