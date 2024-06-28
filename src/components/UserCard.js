import React, { useState } from 'react';
import styled from 'styled-components';

const UserCardStyled = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  margin-right: 16px;
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
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;

  &:hover {
    opacity: 0.8;
  }
`;

const EditButton = styled(ButtonStyled)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const SaveButton = styled(ButtonStyled)`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const DeleteButton = styled(ButtonStyled)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

const UserCard = ({ user, deleteUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9-()]*$/;
    if (regex.test(value)) {
      setPhone(value);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (name && email && phone) {
      updateUser(user.id, { name, email, phone });
      setIsEditing(false);
    } else {
      alert('Все поля должны быть заполнены');
    }
  };

  return (
    <UserCardStyled>
      <UserInfo>
        <UserAvatar src={`https://robohash.org/${user.id}?set=set2`} alt="User Avatar" width="50" height="50" />
        <div>
          {isEditing ? (
            <>
              <InputStyled type="text" value={name} onChange={(e) => setName(e.target.value)} />
              <InputStyled type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <InputStyled type="tel" value={phone} onChange={handlePhoneChange} />
            </>
          ) : (
            <>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </>
          )}
        </div>
      </UserInfo>
      {isEditing ? (
        <SaveButton onClick={handleSave}>Сохранить</SaveButton>
      ) : (
        <EditButton onClick={handleEdit}>Редактировать</EditButton>
      )}
      <DeleteButton onClick={() => deleteUser(user.id)}>Удалить</DeleteButton>
    </UserCardStyled>
  );
};

export default UserCard;
