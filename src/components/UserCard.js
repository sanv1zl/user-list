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

const UserCard = ({ user, deleteUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser(user.id, { name, email, phone });
    setIsEditing(false);
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
              <InputStyled type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
        <button onClick={handleSave}>Сохранить</button>
      ) : (
        <button onClick={handleEdit}>Редактировать</button>
      )}
      <button onClick={() => deleteUser(user.id)}>Удалить</button>
    </UserCardStyled>
  );
};

export default UserCard;
