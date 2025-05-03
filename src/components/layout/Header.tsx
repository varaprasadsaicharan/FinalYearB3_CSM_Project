import React from 'react';
import { Menu, UserCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 sm:hidden" />
            <Link to="/" className="ml-2 text-xl font-semibold text-gray-900">
              AI-Driven Diagnostic System
            </Link>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/diagnosis">Diagnosis</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </div>
          <div className="flex items-center">
            <NavLink to="/login" className="flex items-center">
              <UserCircle2 className="h-5 w-5 mr-1" />
              Login
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children, className = '' }: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-blue-500 px-1 py-2 text-sm font-medium ${className}`}
    >
      {children}
    </Link>
  );
}