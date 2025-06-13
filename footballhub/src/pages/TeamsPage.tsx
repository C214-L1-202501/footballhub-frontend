import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchTeams } from '../store/slices/teamsSlice';
import { fetchCountries } from '../store/slices/countriesSlice';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Users, Filter } from 'lucide-react';

const TeamsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(state => state.teams);
  const { countries } = useAppSelector(state => state.countries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchCountries());
  }, [dispatch]);

  const filteredTeams = teams.data.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (team.nickname && team.nickname.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCountry = selectedCountry === '' || team.country.toString() === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  if (teams.loading) {
    return <LoadingSpinner text="Carregando times..." />;
  }

  if (teams.error) {
    return (
      <ErrorMessage 
        message={teams.error} 
        onRetry={() => dispatch(fetchTeams())}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">Times</h1>
        <div className="flex flex-col sm:flex-row gap-4 lg:w-2/3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar times..."
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            >
              <option value="">Todos os Países</option>
              {countries.data.map((country) => (
                <option key={country.id} value={country.id.toString()}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Link key={team.id} to={`/teams/${team.id}`}>
            <Card hover>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{team.name}</h3>
                  {team.nickname && (
                    <p className="text-sm text-gray-600">"{team.nickname}"</p>
                  )}
                  <p className="text-sm text-gray-500">{team.city}</p>
                  <p className="text-xs text-gray-400">Fundado em: {new Date(team.founding_date).getFullYear()}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredTeams.length === 0 && (searchQuery || selectedCountry) && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum time encontrado</h3>
          <p className="text-gray-500">Tente ajustar sua busca ou critérios de filtragem.</p>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;