import { FiEye, FiPrinter } from 'react-icons/fi';
import { useState } from 'react';

const ViewPage = ({ pets, onUpdateDebt }) => {
  const [editingId, setEditingId] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePayment = (petId, currentDebt) => {
    const amount = parseFloat(paymentAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Ingrese un monto válido mayor a cero');
      return;
    }

    if (amount > currentDebt) {
      alert('El pago no puede ser mayor a la deuda actual');
      return;
    }

    const newDebt = currentDebt - amount;
    const isDebtCleared = newDebt <= 0;

    // Llamada segura a onUpdateDebt con valor por defecto
    onUpdateDebt(petId, newDebt > 0 ? newDebt : 0);

    setSuccessMessage(
      isDebtCleared
        ? `¡Deuda saldada completamente!`
        : `Pago de $${amount.toFixed(2)} aplicado`
    );

    setEditingId(null);
    setPaymentAmount('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  // Filtra deudores y actualiza la lista automáticamente
  const deudores = pets.filter(p => p.esDeudor);



  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiEye className="text-blue-600 text-2xl" />
          <h2 className="text-xl font-semibold text-blue-800">Vista Previa</h2>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200">
          <FiPrinter />
          Imprimir
        </button>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Resumen General</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Mascotas Registradas</p>
              <p className="text-2xl font-bold">{pets.length}</p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Próximas Citas</p>
              <p className="text-2xl font-bold">
                {pets.filter(p => p.appointmentDate).length}
              </p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Total Deudores</p>
              <p className="text-2xl font-bold">{deudores.length}</p>
            </div>
            <div className="bg-white p-3 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">Deuda Total</p>
              <p className="text-2xl font-bold">
                ${deudores.reduce((sum, pet) => sum + pet.deuda, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Últimas Mascotas Registradas</h3>
          <div className="space-y-2">
            {pets.slice(0, 5).map(pet => (
              <div key={pet.id} className="bg-white p-3 rounded-md shadow-sm">
                <p className="font-medium">{pet.petName}</p>
                <p className="text-sm text-gray-600">Dueño: {pet.ownerName}</p>
                {pet.esDeudor && (
                  <p className="text-xs text-red-500 mt-1">Deuda: ${pet.deuda.toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="font-medium text-red-800 mb-2">Deudores</h3>
          {deudores.length === 0 ? (
            <p className="text-sm text-gray-600">No hay deudores.</p>
          ) : (
            <ul className="space-y-2">
              {deudores.map(pet => (
                <li key={pet.id} className="bg-white p-3 rounded-md shadow-sm border border-red-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-red-800">{pet.petName} - {pet.ownerName}</p>
                      <p className="text-sm text-gray-600">Debe: ${pet.deuda.toFixed(2)}</p>
                    </div>
                    {editingId === pet.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder="$$$$"
                          className="border px-2 text-center py-3 mr-5 rounded w-24 text-sm"
                          min="0"
                          max={pet.deuda}
                          step="0.01"
                        />
                        <button
                          onClick={() => handlePayment(pet.id, pet.deuda)}
                          className="bg-blue-500 text-white px-5 py-3 mr-5 rounded text-sm hover:bg-blue-600"
                        >
                          Aplicar
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setPaymentAmount('');
                          }}
                          className="bg-gray-300 px-5 py-3 mr-5 rounded text-sm hover:bg-gray-400"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(pet.id);
                          setPaymentAmount('');
                        }}
                        className="bg-blue-500 text-white px-5 py-3 mr-5 rounded text-sm hover:bg-blue-600"
                      >
                        Registrar Pago
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
