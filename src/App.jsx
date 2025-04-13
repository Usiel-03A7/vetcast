import { useEffect, useState } from 'react';
import { auth } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PetForm from './components/PetForm';
import CalendarView from './components/CalendarView';
import PetList from './components/PetList';
import EditPage from './components/EditPage';
import ViewPage from './components/ViewPage';
import { FiPlus } from 'react-icons/fi';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState('agenda');
  const [pageSettings, setPageSettings] = useState({
    title: 'VetCast Veterinaria',
    colors: {
      primary: '#3b82f6',
      secondary: '#1d4ed8'
    }
  });

  // Verificar estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Cargar mascotas solo si hay usuario autenticado
  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

  const handleUpdateDebt = async (petId, newDebt) => {
    try {
      await updateDoc(doc(db, 'pets', petId), {
        deuda: newDebt,
        esDeudor: newDebt > 0,
        lastUpdated: new Date().toISOString()
      });

      setPets(pets.map(pet =>
        pet.id === petId
          ? {
            ...pet,
            deuda: newDebt,
            esDeudor: newDebt > 0
          }
          : pet
      ));
    } catch (error) {
      console.error("Error updating debt:", error);
    }
  };

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
      setShowForm(false);
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  // ... (resto de tus funciones handleDeleteAppointment, handleDeletePet, etc.)
  const handleDeleteAppointment = async (petId) => {
    try {
      await updateDoc(doc(db, 'pets', petId), {
        appointmentDate: null,
        lastUpdated: new Date().toISOString()
      });
      setPets(pets.map(pet =>
        pet.id === petId ? { ...pet, appointmentDate: null } : pet
      ));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={() => setUser(auth.currentUser)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        pageTitle={pageSettings.title}
      />

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {activeView === 'edit-page' ? (
          <EditPage
            pets={pets}
            onEditPet={(pet) => {
              setEditingPet(pet);
              setShowForm(true);
              setActiveView('agenda');
            }}
          />
        ) : activeView === 'view-page' ? (
          <ViewPage
            pets={pets}
            settings={pageSettings}
            onUpdateDebt={handleUpdateDebt} 
          />
        ) : (
          <>
            {/* Controles móviles */}
            <div className="lg:hidden mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {showForm ? 'Ocultar Formulario' : (
                  <>
                    <FiPlus /> Nueva Mascota
                  </>
                )}
              </button>
              <div className="flex-1 flex gap-2">
                <button
                  onClick={() => setActiveView('agenda')}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-md ${activeView === 'agenda' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Agenda
                </button>
                <button
                  onClick={() => setActiveView('lista')}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 px-2 rounded-md ${activeView === 'lista' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                >
                  Lista
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Formulario */}
              <div className={`${showForm ? 'block' : 'hidden'} lg:block lg:w-1/3`}>
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

              {/* Contenido principal */}
              <div className="lg:w-2/3">
                {activeView === 'agenda' ? (
                  <CalendarView
                    pets={pets}
                    onEdit={(pet) => {
                      setEditingPet(pet);
                      setShowForm(true);
                    }}
                    onDeleteAppointment={handleDeleteAppointment}
                  />
                ) : (
                  <PetList
                    pets={pets}
                    setPets={setPets}
                    setEditingPet={(pet) => {
                      setEditingPet(pet);
                      setShowForm(true);
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
