import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchChampionships } from '../store/slices/championshipsSlice';
import { fetchCountries } from '../store/slices/countriesSlice';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Badge from '../components/common/Badge';
import { Trophy, Filter } from 'lucide-react';

const ChampionshipsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { championships } = useAppSelector(state => state.championships);
  const { countries } = useAppSelector(state => state.countries);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    dispatch(fetchChampionships());
    dispatch(fetchCountries());
  }, [dispatch]);

  const filteredChampionships = championships.data.filter(championship => {
    const matchesSearch = championship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         championship.season.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === '' || championship.country.toString() === selectedCountry;
    
    return matchesSearch && matchesCountry;
  });

  const championshipsByCountry = filteredChampionships.reduce((acc, championship) => {
    const country = countries.data.find(c => c.id === championship.country);
    const countryName = country ? country.name : '2025';

    if (!acc[countryName]) {
      acc[countryName] = [];
    }
    acc[countryName].push(championship);
    return acc;
  }, {} as Record<string, typeof championships.data>);

  if (championships.loading) {
    return <LoadingSpinner text="Carregando campeonatos..." />;
  }

  if (championships.error) {
    return (
      <ErrorMessage 
        message={championships.error} 
        onRetry={() => dispatch(fetchChampionships())}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 lg:mb-0">Campeonatos</h1>

        <div className="flex flex-col sm:flex-row gap-4 lg:w-2/3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Pesquisar campeonatos..."
            />
          </div>
          
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
        </div>
      </div>

      {Object.keys(championshipsByCountry).length > 0 ? (
        <div className="space-y-8">
          {Object.entries(championshipsByCountry).map(([countryName, countryChampionships]) => (
            <div key={countryName}>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                {countryName}
                <Badge variant="secondary" size="sm">
                  {countryChampionships.length}
                </Badge>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {countryChampionships.map((championship) => (
                  <Card key={championship.id}>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                        <Trophy className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{championship.name}</h3>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600">Temporada {championship.season}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum campeonato encontrado</h3>
          <p className="text-gray-500">Tente ajustar sua pesquisa ou critérios de filtragem.</p>
        </div>
      )}
    </div>
  );
};

export default ChampionshipsPage;