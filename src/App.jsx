import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import PetForm from './components/PetForm';
import CalendarView from './components/CalendarView';

function App() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  // Cargar mascotas
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pets'));
        const petsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPets(petsData);
      } catch (error) {
        console.error("Error loading pets:", error);
      }
    };
    fetchPets();
  }, []);

  // Crear o actualizar mascota
  const handleSavePet = async (petData) => {
    try {
      if (editingPet) {
        await updateDoc(doc(db, 'pets', editingPet.id), petData);
        setPets(pets.map(p => p.id === editingPet.id ? { ...petData, id: editingPet.id } : p));
      } else {
        const docRef = await addDoc(collection(db, 'pets'), petData);
        setPets([...pets, { ...petData, id: docRef.id }]);
      }
      setEditingPet(null);
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  // Eliminar cita (solo quita la fecha)
  const handleDeleteAppointment = async (petId) => {
    try {
      await updateDoc(doc(db, 'pets', petId), {
        appointmentDate: null,
        lastUpdated: new Date().toISOString()
      });
      setPets(pets.map(pet => 
        pet.id === petId ? {...pet, appointmentDate: null} : pet
      ));
      if (editingPet?.id === petId) {
        setEditingPet({...editingPet, appointmentDate: null});
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Eliminar mascota completamente
  const handleDeletePet = async (petId) => {
    if (window.confirm('¿Eliminar este registro permanentemente?')) {
      try {
        await deleteDoc(doc(db, 'pets', petId));
        setPets(pets.filter(pet => pet.id !== petId));
        if (editingPet?.id === petId) {
          setEditingPet(null);
        }
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">VetCast Calendar</h1>
          <p className="text-blue-600">Gestión Completa de Citas Veterinarias</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PetForm
              editingPet={editingPet}
              onSave={handleSavePet}
              onCancel={() => setEditingPet(null)}
              onDeleteAppointment={handleDeleteAppointment}
              onDeletePet={handleDeletePet}
            />
          </div>

          <div className="lg:col-span-2">
            <CalendarView 
              pets={pets} 
              onEdit={setEditingPet}
              onDeleteAppointment={handleDeleteAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
