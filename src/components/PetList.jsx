import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const PetList = ({ pets, setPets, setEditingPet }) => {
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta mascota?')) {
      try {
        await deleteDoc(doc(db, 'pets', id));
        setPets(pets.filter(pet => pet.id !== id));
      } catch (error) {
        console.error("Error deleting pet:", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">📋 Registro Completo de Mascotas</h2>

      {pets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-blue-500">No hay mascotas registradas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pets.map(pet => (
            <div key={pet.id} className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-blue-800">{pet.petName}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {pet.age} años
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-3">
                <div className="flex items-start">
                  <span className="font-medium text-blue-600 min-w-[100px]">Dueño:</span>
                  <span>{pet.ownerName}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-600 min-w-[100px]">Teléfono:</span>
                  <span>{pet.phone || 'N/A'}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-600 min-w-[100px]">Precio:</span>
                  <span>${pet.price || '0'}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-blue-600 min-w-[100px]">Ingreso:</span>
                  <span>{new Date(pet.admissionDate).toLocaleDateString() || 'N/A'}</span>
                </div>
                {pet.appointmentDate && (
                  <div className="flex items-start">
                    <span className="font-medium text-blue-600 min-w-[100px]">Próxima cita:</span>
                    <span>{new Date(pet.appointmentDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setEditingPet(pet)}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pet.id)}
                  className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetList;
