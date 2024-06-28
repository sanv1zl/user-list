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

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9-()]*$/;
    if (regex.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      addUser({ name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
    } else {
      alert('Все поля должны быть заполнены');
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" required />
      <InputStyled type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <InputStyled type="tel" value={phone} onChange={handlePhoneChange} placeholder="Телефон" required />
      <ButtonStyled type="submit">Добавить</ButtonStyled>
    </FormStyled>
  );
};

export default AddUserForm;
