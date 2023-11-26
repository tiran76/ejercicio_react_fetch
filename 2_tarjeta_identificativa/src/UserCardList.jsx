import React from 'react';
import styled from 'styled-components';
import { UserCard } from './UserCard';

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const UserCardList = ({ users }) => {
  return (
    <GridLayout>
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </GridLayout>
  );
};

export default UserCardList;
