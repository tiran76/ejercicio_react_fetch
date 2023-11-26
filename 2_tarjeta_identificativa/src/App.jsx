// App.jsx
import { useState } from 'react';
import { UserCard } from './UserCard'; // Asegúrate de que la ruta sea correcta
import './App.css';

function App() {
  const [user] = useState({
    name: "EUGENIO",
    surname: "RUIZ DOMENECH",
    username: "eugenio_98",
    gender: "male",
    birthdate: "05/04/1998",
    age: 25,
    email: "eugenio_98@hotmail.com",
    province: "Sevilla",
    image: "https://randomuser.me/api/portraits/lego/1.jpg",
  });

  return (
    <div className="App">
      <UserCard user={user} />
    </div>
  );
}

export default App;
