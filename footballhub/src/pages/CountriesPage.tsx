import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchCountries } from '../store/slices/countriesSlice';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Flag } from 'lucide-react';

const CountriesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector(state => state.countries);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const filteredCountries = countries.data.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (countries.loading) {
    return <LoadingSpinner text="Loading countries..." />;
  }

  if (countries.error) {
    return (
      <ErrorMessage 
        message={countries.error} 
        onRetry={() => dispatch(fetchCountries())}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Países</h1>
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Pesquisar países..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map((country) => (
          <Link key={country.id} to={`/countries/${country.id}`}>
            <Card hover>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                  <Flag className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{country.name}</h3>
                  <p className="text-sm text-gray-500">Clique para explorar</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredCountries.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum país encontrado</h3>
          <p className="text-gray-500">Tente ajustar seus termos de pesquisa.</p>
        </div>
      )}
    </div>
  );
};

export default CountriesPage;