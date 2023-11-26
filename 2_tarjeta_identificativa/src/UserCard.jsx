// UserCard.jsx
import React from 'react';
import styled from 'styled-components';

const UserCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 400px;
  height: 250px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #333;
`;

const UserDetails = styled.p`
  margin: 5px 0;
`;

export const UserCard = ({ user }) => {
  return (
    <UserCardWrapper>
      <Title>{user.username}</Title>
      <UserImage src={user.image} alt={`${user.name} ${user.surname}`} />
      <UserInfo>
        <UserDetails>{user.name} {user.surname}</UserDetails>
        <UserDetails>{user.birthdate} ({user.age} años)</UserDetails>
        <UserDetails>{user.email}</UserDetails>
        <UserDetails>{user.province}</UserDetails>
      </UserInfo>
    </UserCardWrapper>
  );
};
