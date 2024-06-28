import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddUserForm from './components/AddUserForm';

test('renders AddUserForm and submits user data', () => {
  const addUser = jest.fn();
  const { getByPlaceholderText, getByText } = render(<AddUserForm addUser={addUser} />);

  fireEvent.change(getByPlaceholderText('Имя'), { target: { value: 'John Doe' } });
  fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
  fireEvent.change(getByPlaceholderText('Телефон'), { target: { value: '1234567890' } });

  fireEvent.click(getByText('Добавить'));

  expect(addUser).toHaveBeenCalledWith({ name: 'John Doe', email: 'john@example.com', phone: '1234567890' });
});