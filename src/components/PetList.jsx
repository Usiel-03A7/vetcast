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
      <h2 className="text-xl font-semibold text-blue-700 mb-4">📋 Registro de Mascotas</h2>
      
      {pets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-blue-500">No hay mascotas registradas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map(pet => (
            <div key={pet.id} className="border border-blue-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-blue-800">{pet.name}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {pet.age} años
                </span>
              </div>
              
              <div className="space-y-1 text-sm text-gray-700 mb-3">
                <p><span className="font-medium text-blue-600">Dueño:</span> {pet.owner}</p>
                <p><span className="font-medium text-blue-600">Teléfono:</span> {pet.phoneNumber || 'N/A'}</p>
                <p><span className="font-medium text-blue-600">Precio:</span> ${pet.price || '0'}</p>
                <p><span className="font-medium text-blue-600">Última visita:</span> {pet.lastVisit?.toLocaleDateString() || 'N/A'}</p>
                <p><span className="font-medium text-blue-600">Próxima visita:</span> {pet.NextVisit?.toLocaleDateString() || 'N/A'}</p>
              </div>
              
              {pet.Information && (
                <div className="mt-2 pt-2 border-t border-blue-50">
                  <p className="text-sm text-gray-600"><span className="font-medium text-blue-600">Notas:</span> {pet.Information}</p>
                </div>
              )}
              
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
