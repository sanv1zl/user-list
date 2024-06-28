import React from 'react';
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

const UserCard = ({ user, deleteUser }) => {
  return (
    <UserCardStyled>
      <UserInfo>
        <UserAvatar src={`https://robohash.org/${user.id}?set=set2`} alt="User Avatar" width="50" height="50" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </UserInfo>
      <button onClick={() => deleteUser(user.id)}>Удалить</button>
    </UserCardStyled>
  );
};

export default UserCard;
