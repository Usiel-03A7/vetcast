import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './config/firebase';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {

        const querySnapshot = await getDocs(collection(db, 'pets'));


        const petsData = querySnapshot.docs.map((doc) => {
          const pet = doc.data();
          return {
            id: doc.id,
            name: pet.name || 'Sin nombre',
            age: pet.age || 'N/A',
            owner: pet.owner || 'Dueño no registrado',
            phoneNumber: pet.phoneNumber || 'Sin teléfono',
            price: pet.price || 0,
            lastVisit: pet.lastVisit?.toDate() || null,
            NextVisit: pet.NextVisit?.toDate() || null,
            Information: pet.Information || 'Sin información adicional'
          };
        });


        setPets(petsData);
        console.log("Mascotas obtenidas:", petsData);

      } catch (error) {
        console.error("Error al cargar mascotas:", error);
      }
    };

    fetchPets();
  }, []);
  console.log("Estado de pets:", pets);

  return (
    <div>
      <h1>Lista de Mascotas</h1>
      <p>ppp</p>
      <ul>
        {pets.lenght === 0 && <p>No hay registros</p>}
        {pets.map((pet,) => (
          <li key={pet.id}>
            <h3>{pet.name}</h3>
            <p><strong>Edad:</strong> {pet.age}</p>
            <p><strong>Dueño:</strong> {pet.owner}</p>
            <p><strong>Teléfono:</strong> {pet.phoneNumber}</p>
            <p><strong>Precio consulta:</strong> ${pet.price}</p>
            <p><strong>Última visita:</strong> {pet.lastVisit?.toLocaleDateString()}</p>
            <p><strong>Próxima visita:</strong> {pet.NextVisit?.toLocaleDateString()}</p>
            <p><strong>Notas:</strong> {pet.Information}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
