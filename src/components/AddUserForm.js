import React, { useState } from 'react';
import styled from 'styled-components';

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const InputStyled = styled.input`
  margin: 4px 0;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonStyled = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddUserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ name, email, phone });
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" required />
      <InputStyled type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <InputStyled type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" required />
      <ButtonStyled type="submit">Добавить</ButtonStyled>
    </FormStyled>
  );
};

export default AddUserForm;
