import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import PetForm from './components/PetForm';
import CalendarView from './components/CalendarView';

function App() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [showForm, setShowForm] = useState(false); // Solo para móvil

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
      setShowForm(false); // Cerrar formulario en móvil después de guardar
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

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

  const handleDeletePet = async (petId) => {
    if (window.confirm('¿Eliminar este registro permanentemente?')) {
      try {
        await deleteDoc(doc(db, 'pets', petId));
        setPets(pets.filter(pet => pet.id !== petId));
        if (editingPet?.id === petId) {
          setEditingPet(null);
          setShowForm(false);
        }
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-2">VetCast Calendar</h1>
          <p className="text-sm sm:text-base text-blue-600">Gestión Completa de Citas Veterinarias</p>
        </header>

        {/* Botón para mostrar formulario en móvil */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Formulario - Oculto en móvil a menos que showForm sea true */}
          <div className={`${showForm ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <PetForm
              editingPet={editingPet}
              onSave={handleSavePet}
              onCancel={() => {
                setEditingPet(null);
                setShowForm(false);
              }}
              onDeleteAppointment={handleDeleteAppointment}
              onDeletePet={handleDeletePet}
            />
          </div>

          {/* Calendario - Siempre visible */}
          <div className="lg:col-span-2">
            <CalendarView 
              pets={pets} 
              onEdit={(pet) => {
                setEditingPet(pet);
                setShowForm(true); // Mostrar formulario al editar en móvil
              }}
              onDeleteAppointment={handleDeleteAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
