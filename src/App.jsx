import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import PetForm from './components/PetForm';
import PetList from './components/PetList';

function App() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pets'));
        const petsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          lastVisit: doc.data().lastVisit?.toDate() || null,
          NextVisit: doc.data().NextVisit?.toDate() || null
        }));
        setPets(petsData);
      } catch (error) {
        console.error("Error loading pets:", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">VetCast</h1>
          <p className="text-blue-600">Gestion de mascotas</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PetForm
              editingPet={editingPet}
              setEditingPet={setEditingPet}
              pets={pets}
              setPets={setPets}
            />
          </div>

          <div className="lg:col-span-2">
            <PetList
              pets={pets}
              setPets={setPets}
              setEditingPet={setEditingPet}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
