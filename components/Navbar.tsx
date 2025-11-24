import React, { useState } from 'react';
import { Menu, X, Anchor, CalendarPlus, Users, Stethoscope } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Meus Agendamentos', path: '/', icon: <Anchor className="w-5 h-5 mr-2" /> },
    { name: 'Nova Inspeção', path: '/agendar', icon: <CalendarPlus className="w-5 h-5 mr-2" /> },
    { name: 'Banco de Pessoal', path: '/pessoal', icon: <Users className="w-5 h-5 mr-2" /> },
    { name: 'Área do Perito', path: '/agente', icon: <Stethoscope className="w-5 h-5 mr-2" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-navy-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="bg-white p-1 rounded-full">
                 <Anchor className="h-6 w-6 text-navy-900" />
              </div>
              <span className="font-bold text-lg tracking-wider">SISAG-HNRe</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-navy-700 text-white'
                      : 'text-navy-100 hover:bg-navy-700 hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-navy-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-800 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-3 py-4 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-navy-900 text-white'
                    : 'text-gray-300 hover:bg-navy-700 hover:text-white'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;