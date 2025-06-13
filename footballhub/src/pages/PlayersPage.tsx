import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchPlayers } from '../store/slices/playersSlice';
import { fetchCountries } from '../store/slices/countriesSlice';
import { fetchTeams } from '../store/slices/teamsSlice';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Badge from '../components/common/Badge';
import { User, Filter } from 'lucide-react';

const PlayersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { players } = useAppSelector(state => state.players);
  const { countries } = useAppSelector(state => state.countries);
  const { teams } = useAppSelector(state => state.teams);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');

  useEffect(() => {
    dispatch(fetchPlayers());
    dispatch(fetchCountries());
    dispatch(fetchTeams());
  }, [dispatch]);

  const positions = [...new Set(players.data.map(player => player.position))].sort();

  const filteredPlayers = players.data.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === '' || player.country.toString() === selectedCountry;
    const matchesPosition = selectedPosition === '' || player.position === selectedPosition;
    
    return matchesSearch && matchesCountry && matchesPosition;
  });

  if (players.loading) {
    return <LoadingSpinner text="Carregando jogadores..." />;
  }

  if (players.error) {
    return (
      <ErrorMessage 
        message={players.error} 
        onRetry={() => dispatch(fetchPlayers())}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">Jogadores</h1>
        <div className="flex flex-col sm:flex-row gap-4 lg:w-3/4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Pesquisar jogadores..."
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              >
                <option value="">País</option>
                {countries.data.map((country) => (
                  <option key={country.id} value={country.id.toString()}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            >
              <option value="">Posição</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredPlayers.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredPlayers.map((player) => {
              const team = teams.data.find(t => t.id === player.team);
              const country = countries.data.find(c => c.id === player.country);
              
              return (
                <li key={player.id}>
                  <Link 
                    to={`/players/${player.id}`}
                    className="block hover:bg-gray-50 px-4 py-4 sm:px-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{player.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {team && <span>{team.name}</span>}
                            {country && <span>• {country.name}</span>}
                          </div>
                          <p className="text-xs text-gray-400">
                            {new Date().getFullYear() - new Date(player.birth_date).getFullYear()} anos
                          </p>
                        </div>
                      </div>
                      <Badge variant="primary">{player.position}</Badge>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum jogador encontrado</h3>
            <p className="text-gray-500">Tente ajustar sua pesquisa ou critérios de filtro.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayersPage;