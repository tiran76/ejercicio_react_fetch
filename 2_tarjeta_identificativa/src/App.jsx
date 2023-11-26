import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCardList from './UserCardList';
import UserControls from './UserControls';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

const LoadingMessage = styled.div`
  text-align: center;
  width: 100%;
`;

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getImageURL = (gender) =>
  `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${getRandomInt(100)}.jpg`;

function App() {
  const [userData, setUserData] = useState({
    status: 'loading',
    users: [],
  });
  const [resultCount, setResultCount] = useState(10);

  const loadUsers = (count) => {
    setUserData({ ...userData, status: 'loading' });
    fetch(`https://randomuser.me/api/?results=${count}&nat=es`)
      .then((response) => response.json())
      .then((data) => {
        const users = data.results.map((user) => ({
          name: user.name.first,
          surname: user.name.last,
          username: user.login.username,
          gender: user.gender,
          birthdate: new Date(user.dob.date).toLocaleDateString(),
          age: user.dob.age,
          email: user.email,
          province: user.location.state,
          image: getImageURL(user.gender),
        }));
        setUserData({ status: 'loaded', users });
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setUserData({ status: 'error', users: [] });
      });
  };

  useEffect(() => {
    loadUsers(resultCount);
  }, [resultCount]);

  return (
    <AppContainer>
      <UserControls
        resultCount={resultCount}
        onResultCountChange={(e) => setResultCount(e.target.value)}
        onReload={() => loadUsers(resultCount)}
        isLoading={userData.status === 'loading'}
      />
      {userData.status === 'loading' && <LoadingMessage>Cargando...</LoadingMessage>}
      {userData.status === 'error' && <LoadingMessage>Error al cargar los datos.</LoadingMessage>}
      {userData.status === 'loaded' && <UserCardList users={userData.users} />}
    </AppContainer>
  );
}

export default App;
