import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';

interface HeaderProps {
  onMobileMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuClick }) => {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between h-16 px-4 bg-white shadow-sm border-b border-gray-200">
        <button
          type="button"
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
          onClick={onMobileMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <h1 className="text-lg font-semibold text-gray-900">FootballHub</h1>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;