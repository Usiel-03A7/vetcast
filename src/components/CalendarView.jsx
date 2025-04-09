import { useState } from 'react';
import { format, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { FiEdit2, FiTrash2, FiArrowLeft, FiX } from 'react-icons/fi';

const CalendarView = ({ pets, onEdit, onDeleteAppointment }) => {
  const validPets = pets.filter(pet => pet.appointmentDate);
  const [selectedDate, setSelectedDate] = useState(null);

  const appointmentsByDate = validPets.reduce((acc, pet) => {
    const dateKey = pet.appointmentDate;
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(pet);
    return acc;
  }, {});

  const currentMonth = new Date();
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const handleDateClick = (date) => {
    if (window.innerWidth < 768) {
      setSelectedDate(date);
    }
  };

  const handleAppointmentClick = (e, app) => {
    if (window.innerWidth >= 768) {
      e.stopPropagation();
      onEdit(app);
    }
  };

  if (selectedDate) {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const appointments = appointmentsByDate[dateKey] || [];

    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <button
          onClick={() => setSelectedDate(null)}
          className="mb-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors flex items-center gap-2"
        >
          <FiArrowLeft className="inline-block" />
          Volver al mes
        </button>

        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Citas para {format(selectedDate, 'PPPP', { locale: es })}
        </h3>

        <div className="space-y-2">
          {appointments.length > 0 ? (
            appointments.map(app => (
              <div
                key={app.id}
                className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-blue-800">🐾 {app.petName}</h4>
                    <p className="text-sm text-blue-600">{app.ownerName}</p>
                    {app.phone && <p className="text-xs text-blue-500 mt-1">{app.phone}</p>}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(app)}
                      className="p-2 text-blue-600 hover:text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                      title="Editar cita"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`¿Eliminar cita de ${app.petName}?`)) {
                          onDeleteAppointment(app.id);
                          setSelectedDate(null);
                        }
                      }}
                      className="p-2 text-red-600 hover:text-red-800 rounded-md hover:bg-red-100 transition-colors"
                      title="Eliminar cita"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-4">No hay citas para este día</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
      <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4">
        {format(currentMonth, 'MMMM yyyy', { locale: es })}
      </h2>

      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-blue-600 py-1 sm:py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-12 sm:min-h-16 p-1 border border-transparent" />
        ))}

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
              className={`min-h-12 sm:min-h-16 p-1 border ${
                isToday(date) ? 'bg-blue-50 border-blue-300' : 'border-gray-100'
              } hover:bg-gray-50 transition-colors cursor-pointer`}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-right text-xs sm:text-sm mb-1">{day}</div>
              <div className="space-y-1 max-h-14 sm:max-h-20 overflow-y-auto">
                {appointments.map(app => (
                  <div
                    key={app.id}
                    className="text-xs bg-blue-100 text-blue-800 p-1 rounded flex justify-between items-center group hover:bg-blue-200 cursor-pointer"
                    onClick={(e) => handleAppointmentClick(e, app)}
                  >
                    <span className="truncate">
                      🐾 {app.petName}
                    </span>
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
