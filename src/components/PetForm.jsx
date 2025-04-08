import { useState, useEffect } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const PetForm = ({ editingPet, setEditingPet, pets, setPets }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    owner: '',
    phoneNumber: '',
    price: '',
    lastVisit: '',
    NextVisit: '',
    Information: ''
  });

  useEffect(() => {
    if (editingPet) {
      setFormData({
        name: editingPet.name,
        age: editingPet.age.toString(),
        owner: editingPet.owner,
        phoneNumber: editingPet.phoneNumber,
        price: editingPet.price.toString(),
        lastVisit: editingPet.lastVisit?.toISOString().split('T')[0] || '',
        NextVisit: editingPet.NextVisit?.toISOString().split('T')[0] || '',
        Information: editingPet.Information || ''
      });
    }
  }, [editingPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const petData = {
        ...formData,
        age: parseInt(formData.age),
        price: parseFloat(formData.price),
        lastVisit: formData.lastVisit ? new Date(formData.lastVisit) : null,
        NextVisit: formData.NextVisit ? new Date(formData.NextVisit) : null
      };

      if (editingPet) {
        await updateDoc(doc(db, 'pets', editingPet.id), petData);
        setPets(pets.map(p => p.id === editingPet.id ? { ...petData, id: editingPet.id } : p));
      } else {
        const docRef = await addDoc(collection(db, 'pets'), petData);
        setPets([...pets, { ...petData, id: docRef.id }]);
      }

      setFormData({
        name: '',
        age: '',
        owner: '',
        phoneNumber: '',
        price: '',
        lastVisit: '',
        NextVisit: '',
        Information: ''
      });
      setEditingPet(null);
    } catch (error) {
      console.error("Error saving pet:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        {editingPet ? '✏️ Editar Mascota' : '🐾 Agregar Nueva Mascota'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Edad</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Dueño</label>
          <input
            type="text"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Teléfono</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Precio Consulta ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Última Visita</label>
          <input
            type="date"
            name="lastVisit"
            value={formData.lastVisit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Próxima Visita</label>
          <input
            type="date"
            name="NextVisit"
            value={formData.NextVisit}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">Notas Médicas</label>
          <textarea
            name="Information"
            value={formData.Information}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {editingPet ? 'Actualizar' : 'Guardar'}
          </button>

          {editingPet && (
            <button
              type="button"
              onClick={() => setEditingPet(null)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PetForm;
