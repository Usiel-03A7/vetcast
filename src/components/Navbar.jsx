import { useState } from 'react';
import { FiCalendar, FiList, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Navbar = ({ activeView, onViewChange, pageTitle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const navItems = [
    { id: 'agenda', icon: <FiCalendar />, label: 'Agenda' },
    { id: 'lista', icon: <FiList />, label: 'Lista' },
    { id: 'config', icon: <FiSettings />, label: 'Configuración' },
  ];

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo y título */}
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">{pageTitle}</h1>
          </div>
          
          {/* Menú desktop (hidden en mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                  activeView === item.id ? 'bg-blue-900' : 'hover:bg-blue-700'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center gap-1"
              title="Cerrar sesión"
            >
              <FiLogOut />
              <span className="hidden lg:inline">Salir</span>
            </button>
          </div>
          
          {/* Botón hamburguesa (solo mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú mobile (se muestra al hacer clic) */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onViewChange(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 ${
                activeView === item.id ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-700'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          
          <button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2 text-white hover:bg-red-700"
          >
            <FiLogOut />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
