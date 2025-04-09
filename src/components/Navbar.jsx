import { FiCalendar, FiList, FiEdit, FiEye, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Navbar = ({ activeView, onViewChange, pageTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (view) => {
    onViewChange(view);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Forzar recarga para redirigir al login
      window.location.reload();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const NavButton = ({ view, icon, text }) => (
    <button
      onClick={() => handleNavigation(view)}
      className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${activeView === view
          ? 'bg-blue-700 text-white'
          : 'text-white hover:bg-blue-700 hover:bg-opacity-50'
        }`}
    >
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </button>
  );

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo y título */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('agenda')}
              className="text-xl font-bold hover:text-blue-200 transition-colors"
            >
              {pageTitle}
            </button>
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
              <span className="hidden lg:inline">Salir</span>
            </button>
          </div>

          {/* Botón hamburguesa para móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 hover:bg-opacity-50 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`md:hidden bg-blue-700 transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
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
            className="w-full px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 text-white hover:bg-red-600 transition-colors"
          >
            <FiLogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
