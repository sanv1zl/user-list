import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import UserList from './components/UserList';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
];

test('fetches and displays users', async () => {
  axios.get.mockResolvedValue({ data: mockUsers });

  render(<UserList />);

  const userElements = await waitFor(() => screen.getAllByText(/@example.com/i));
  expect(userElements).toHaveLength(2);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
});

test('adds a new user', async () => {
  axios.get.mockResolvedValue({ data: mockUsers });
  axios.post.mockResolvedValue({ data: { id: 3, name: 'Alice', email: 'alice@example.com', phone: '1122334455' } });

  render(<UserList />);

  await waitFor(() => screen.getByText('John Doe'));

  userEvent.type(screen.getByPlaceholderText('Имя'), 'Alice');
  userEvent.type(screen.getByPlaceholderText('Email'), 'alice@example.com');
  userEvent.type(screen.getByPlaceholderText('Телефон'), '1122334455');
  userEvent.click(screen.getByText('Добавить'));

  const newUser = await waitFor(() => screen.getByText('Alice'));
  expect(newUser).toBeInTheDocument();
});

test('deletes a user', async () => {
  axios.get.mockResolvedValue({ data: mockUsers });
  axios.delete.mockResolvedValue({});

  render(<UserList />);

  await waitFor(() => screen.getByText('John Doe'));

  userEvent.click(screen.getAllByText('Удалить')[0]);

  await waitFor(() => expect(screen.queryByText('John Doe')).toBeNull());
});
