// App.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserCard } from './UserCard';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;

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

const LoadingMessage = styled.div`
  text-align: center;
  width: 100%;
`;

const Controls = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
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
      <Controls>
        <select
          value={resultCount}
          onChange={(e) => setResultCount(e.target.value)}
          disabled={userData.status === 'loading'}
        >
          {[5, 10, 15, 20].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <button
          onClick={() => loadUsers(resultCount)}
          disabled={userData.status === 'loading'}
        >
          Recargar
        </button>
      </Controls>
      {userData.status === 'loading' && <LoadingMessage>Cargando...</LoadingMessage>}
      {userData.status === 'error' && <LoadingMessage>Error al cargar los datos.</LoadingMessage>}
      {userData.status === 'loaded' && (
        <GridLayout>
          {userData.users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </GridLayout>
      )}
    </AppContainer>
  );
}

export default App;
