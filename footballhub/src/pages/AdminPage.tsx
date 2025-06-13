import React, { useState } from 'react';
import { Settings, Users, User, Trophy, Flag, Building, Plus, Edit, Trash2 } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

const AdminPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'countries' | 'teams' | 'players' | 'championships' | 'stadiums'>('countries');

  const adminSections = [
    { id: 'countries', label: 'Países', icon: Flag, color: 'blue' },
    { id: 'teams', label: 'Times', icon: Users, color: 'green' },
    { id: 'players', label: 'Jogadores', icon: User, color: 'purple' },
    { id: 'championships', label: 'Campeonatos', icon: Trophy, color: 'yellow' },
    { id: 'stadiums', label: 'Estádios', icon: Building, color: 'red' },
  ];

  const mockData = {
    countries: [
      { id: 1, name: 'Brazil', teams: 25, players: 150 },
      { id: 2, name: 'Argentina', teams: 20, players: 120 },
      { id: 3, name: 'Germany', teams: 18, players: 110 },
    ],
    teams: [
      { id: 1, name: 'Barcelona', city: 'Barcelona', country: 'Spain', players: 25 },
      { id: 2, name: 'Real Madrid', city: 'Madrid', country: 'Spain', players: 26 },
      { id: 3, name: 'Manchester United', city: 'Manchester', country: 'England', players: 24 },
    ],
    players: [
      { id: 1, name: 'Lionel Messi', position: 'Forward', team: 'PSG', country: 'Argentina' },
      { id: 2, name: 'Cristiano Ronaldo', position: 'Forward', team: 'Al Nassr', country: 'Portugal' },
      { id: 3, name: 'Neymar Jr', position: 'Forward', team: 'Al Hilal', country: 'Brazil' },
    ],
    championships: [
      { id: 1, name: 'La Liga', season: '2023-24', country: 'Spain', teams: 20 },
      { id: 2, name: 'Premier League', season: '2023-24', country: 'England', teams: 20 },
      { id: 3, name: 'Serie A', season: '2023-24', country: 'Italy', teams: 20 },
    ],
    stadiums: [
      { id: 1, name: 'Camp Nou', capacity: 99354, city: 'Barcelona', country: 'Spain' },
      { id: 2, name: 'Santiago Bernabéu', capacity: 81044, city: 'Madrid', country: 'Spain' },
      { id: 3, name: 'Old Trafford', capacity: 74879, city: 'Manchester', country: 'England' },
    ],
  };

  const renderContent = () => {
    const data = mockData[activeSection];
    const section = adminSections.find(s => s.id === activeSection);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {section && <section.icon className="h-8 w-8 text-gray-700 mr-3" />}
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{section?.label}</h2>
            <Badge variant="secondary" size="sm">
              {data.length} itens
            </Badge>
          </div>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar novo
          </button>
        </div>

        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {activeSection === 'countries' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Times</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jogadores</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </>
                  )}
                  {activeSection === 'teams' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jogadores</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </>
                  )}
                  {activeSection === 'players' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </>
                  )}
                  {activeSection === 'championships' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temporada</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Times</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </>
                  )}
                  {activeSection === 'stadiums' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    {activeSection === 'countries' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.teams}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.players}</td>
                      </>
                    )}
                    {activeSection === 'teams' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.players}</td>
                      </>
                    )}
                    {activeSection === 'players' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="primary" size="sm">{item.position}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.team}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.country}</td>
                      </>
                    )}
                    {activeSection === 'championships' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.season}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.teams}</td>
                      </>
                    )}
                    {activeSection === 'stadiums' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.capacity.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.country}</td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-8">
        <Settings className="h-8 w-8 text-gray-700 mr-3" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel de Controle</h1>
          <p className="text-gray-600">Gerenciar os dados de futebol</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {adminSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as any)}
            className={`p-4 rounded-lg border-2 transition-all ${
              activeSection === section.id
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <section.icon className={`h-8 w-8 mx-auto mb-2 ${
              activeSection === section.id ? 'text-green-600' : 'text-gray-500'
            }`} />
            <p className="font-medium text-sm">{section.label}</p>
          </button>
        ))}
      </div>

      {renderContent()}
    </div>
  );
};

export default AdminPage;