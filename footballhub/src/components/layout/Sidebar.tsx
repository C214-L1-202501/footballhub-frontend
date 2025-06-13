import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Flag, 
  Users, 
  User, 
  Trophy, 
  Settings,
  Search
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Países', href: '/countries', icon: Flag },
    { name: 'Times', href: '/teams', icon: Users },
    { name: 'Jogadores', href: '/players', icon: User },
    { name: 'Campeonatos', href: '/championships', icon: Trophy },
    { name: 'Admin', href: '/admin', icon: Settings },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gradient-to-b from-green-800 to-green-900">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <Trophy className="h-8 w-8 text-white mr-3" />
              <h1 className="text-xl font-bold text-white">FootballHub</h1>
            </div>
            
            <div className="px-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                />
              </div>
            </div>

            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = isActiveRoute(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-green-700 text-white shadow-lg'
                        : 'text-green-100 hover:bg-green-700 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                        isActive ? 'text-white' : 'text-green-300 group-hover:text-white'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;