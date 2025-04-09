import { FiCalendar, FiList, FiEdit, FiEye, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const Navbar = ({ activeView, onViewChange, pageTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view) => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
  };

  const NavButton = ({ view, icon, text }) => (
    <button
      onClick={() => handleNavigation(view)}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${activeView === view
          ? 'bg-blue-700 text-white'
          : 'text-white hover:bg-blue-700'
        }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y menú móvil */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span
                className="text-xl font-bold cursor-pointer"
                onClick={() => handleNavigation('agenda')}
              >
                {pageTitle}
              </span>
            </div>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <NavButton
              view="agenda"
              icon={<FiCalendar size={18} />}
              text="Agenda"
            />
            <NavButton
              view="lista"
              icon={<FiList size={18} />}
              text="Lista"
            />
            <NavButton
              view="edit-page"
              icon={<FiEdit size={18} />}
              text="Editar Página"
            />
            <NavButton
              view="view-page"
              icon={<FiEye size={18} />}
              text="Saldos Pendientes"
            />
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-white hover:bg-red-600 transition-colors"
            >
              <FiLogOut size={18} />
              <span>Salir</span>
            </button>
          </div>

          {/* Menú móvil - hamburguesa */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil - contenido */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavButton
              view="agenda"
              icon={<FiCalendar size={18} />}
              text="Agenda"
            />
            <NavButton
              view="lista"
              icon={<FiList size={18} />}
              text="Lista"
            />
            <NavButton
              view="edit-page"
              icon={<FiEdit size={18} />}
              text="Editar Página"
            />
            <NavButton
              view="view-page"
              icon={<FiEye size={18} />}
              text="Saldos Pendientes"
            />
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-white hover:bg-red-600"
            >
              <FiLogOut size={18} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
