import { FiEye, FiPrinter } from 'react-icons/fi';

const ViewPage = ({ pets }) => {
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
            {/* Agrega más estadísticas según necesites */}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Últimas Mascotas Registradas</h3>
          <div className="space-y-2">
            {pets.slice(0, 5).map(pet => (
              <div key={pet.id} className="bg-white p-3 rounded-md shadow-sm">
                <p className="font-medium">{pet.petName}</p>
                <p className="text-sm text-gray-600">Dueño: {pet.ownerName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
