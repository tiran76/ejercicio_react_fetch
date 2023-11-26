// App.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { UserCard } from './UserCard';

// Contenedor principal que ocupa todo el alto y ancho de la vista
const AppContainer = styled.div`
  min-height: 100vh;
  width: 100vw; // Asegúrate de que ocupa todo el ancho de la vista
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
`;

// Contenedor del grid que organiza las tarjetas de usuario en filas de tres
const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Tres columnas de tamaño igual
  gap: 20px;
  width: 100%; // Asegúrate de que el grid ocupe todo el ancho del contenedor
  max-width: 1200px; // Puedes ajustar esto para limitar el ancho del grid si es necesario

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); // Dos columnas en pantallas más pequeñas
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr; // Una columna en pantallas pequeñas
  }
`;

// Mensaje de carga y error
const LoadingMessage = styled.div`
  text-align: center;
  width: 100%; // Asegúrate de que ocupa todo el ancho del contenedor
`;

// Funciones auxiliares para generar la URL de la imagen
const getRandomInt = (max) => Math.floor(Math.random() * max);
const getImageURL = (gender) =>
  `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${getRandomInt(100)}.jpg`;

function App() {
  const [userData, setUserData] = useState({
    status: 'loading', // Estados: 'loading', 'loaded', 'error'
    users: [],
  });

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=10&nat=es')
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
  }, []);

  if (userData.status === 'loading') {
    return (
      <AppContainer>
        <LoadingMessage>Cargando...</LoadingMessage>
      </AppContainer>
    );
  }

  if (userData.status === 'error') {
    return (
      <AppContainer>
        <LoadingMessage>Error al cargar los datos.</LoadingMessage>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <GridLayout>
        {userData.users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </GridLayout>
    </AppContainer>
  );
}

export default App;
