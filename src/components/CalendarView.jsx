import { format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarView = ({ pets, onEdit, onDeleteAppointment }) => {
  // Filtrar mascotas con cita
  const validPets = pets.filter(pet => pet.appointmentDate);

  // Agrupar por fecha de cita
  const appointmentsByDate = validPets.reduce((acc, pet) => {
    const dateKey = pet.appointmentDate;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(pet);
    return acc;
  }, {});

  // Configuración del mes actual
  const currentMonth = new Date();
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // Obtener primer día del mes
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        {format(currentMonth, 'MMMM yyyy', { locale: es })}
      </h2>

      <div className="grid grid-cols-7 gap-1">
        {/* Días de la semana */}
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center font-medium text-blue-600 py-2">
            {day}
          </div>
        ))}

        {/* Espacios vacíos */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-24 p-1 border border-transparent" />
        ))}

        {/* Días del mes */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const date = new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            day
          );
          const dateKey = format(date, 'yyyy-MM-dd');
          const appointments = appointmentsByDate[dateKey] || [];

          return (
            <div
              key={day}
              className={`min-h-24 p-1 border ${isToday(date) ? 'bg-blue-50 border-blue-300' : 'border-gray-100'}`}
            >
              <div className="text-right text-sm mb-1">{day}</div>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {appointments.map(app => (
                  <div
                    key={app.id}
                    className="text-xs bg-blue-100 text-blue-800 p-1 rounded flex justify-between items-center group hover:bg-blue-200 cursor-pointer"
                    onClick={() => onEdit(app)}
                  >
                    <span className="truncate">
                      🐾 {app.petName} - {app.ownerName}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`¿Cancelar cita de ${app.petName}?`)) {
                          onDeleteAppointment(app.id);
                        }
                      }}
                      className="text-red-500 hover:text-red-700 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Cancelar cita"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
