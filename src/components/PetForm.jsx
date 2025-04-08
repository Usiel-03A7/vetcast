import { useState, useEffect } from 'react';
import { FiSave, FiTrash2, FiX, FiEdit, FiCalendar } from 'react-icons/fi';

const PetForm = ({ editingPet, onSave, onCancel, onDeleteAppointment, onDeletePet }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    age: '',
    phone: '',
    price: '',
    admissionDate: '',
    appointmentDate: '',
    visitCount: 1
  });

  useEffect(() => {
    if (editingPet) {
      setFormData({
        ownerName: editingPet.ownerName || '',
        petName: editingPet.petName || '',
        age: editingPet.age || '',
        phone: editingPet.phone || '',
        price: editingPet.price || '',
        admissionDate: editingPet.admissionDate || '',
        appointmentDate: editingPet.appointmentDate || '',
        visitCount: editingPet.visitCount || 1
      });
    } else {
      setFormData(prev => ({
        ...prev,
        admissionDate: new Date().toISOString().split('T')[0],
        appointmentDate: new Date().toISOString().split('T')[0],
        ownerName: '',
        petName: '',
        phone: ''
      }));
    }
  }, [editingPet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const petData = {
      ...formData,
      age: parseInt(formData.age) || 0,
      price: parseFloat(formData.price) || 0,
      lastUpdated: new Date().toISOString()
    };
    onSave(petData);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-blue-100 max-w-2xl mx-auto">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-700 mb-4 text-center">
        {editingPet ? (
          <FiEdit className="inline-block text-blue-600 text-2xl mr-2" />
        ) : (
          <FiSave className="inline-block text-blue-600 text-2xl mr-2" />
        )}
        {editingPet ? 'Editar Registro' : 'Nuevo Registro'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Nombre del Dueño *
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Nombre de la Mascota *
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Teléfono *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Edad (años) *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="30"
                required
                className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Precio Consulta ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">
                Fecha de Ingreso *
              </label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Fecha de Cita - Full width */}
        <div>
          <label className="block text-sm font-medium text-blue-600 mb-1">
            Fecha de Cita *
          </label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
            className="w-full px-3 py-2 text-base border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botones - Centrados y compactos */}
        <div className="flex justify-center space-x-3 pt-4">
          {editingPet && (
            <button
              type="button"
              onClick={onCancel}
              className="p-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              title="Cancelar"
            >
              <FiX size={24} />
            </button>
          )}
          
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            title={editingPet ? "Actualizar" : "Guardar"}
          >
            {editingPet ? <FiEdit size={24} /> : <FiSave size={24} />}
          </button>

          {editingPet && (
            <>
              <button
                type="button"
                onClick={() => onDeletePet(editingPet.id)}
                className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                title="Eliminar"
              >
                <FiTrash2 size={24} />
              </button>
              
              {editingPet?.appointmentDate && (
                <button
                  type="button"
                  onClick={() => onDeleteAppointment(editingPet.id)}
                  className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                  title="Cancelar Cita"
                >
                  <FiCalendar size={24} />
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default PetForm;
