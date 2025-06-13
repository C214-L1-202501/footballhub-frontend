import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { 
  fetchCountry, 
  fetchCountryTeams, 
  fetchCountryPlayers, 
  fetchCountryStadiums 
} from '../store/slices/countriesSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Flag, Users, User, Building, ArrowLeft } from 'lucide-react';

const CountryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { 
    currentCountry, 
    countryTeams, 
    countryPlayers, 
    countryStadiums 
  } = useAppSelector(state => state.countries);
  
  const [activeTab, setActiveTab] = useState<'teams' | 'players' | 'stadiums'>('teams');

  useEffect(() => {
    if (id) {
      const countryId = parseInt(id);
      dispatch(fetchCountry(countryId));
      dispatch(fetchCountryTeams(countryId));
      dispatch(fetchCountryPlayers(countryId));
      dispatch(fetchCountryStadiums(countryId));
    }
  }, [dispatch, id]);

  if (currentCountry.loading) {
    return <LoadingSpinner text="Carregando detalhes do país..." />;
  }

  if (currentCountry.error || !currentCountry.data) {
    return (
      <ErrorMessage 
        message={currentCountry.error || 'País não encontrado'} 
        onRetry={() => id && dispatch(fetchCountry(parseInt(id)))}
      />
    );
  }

  const tabs = [
    { id: 'teams', label: 'Times', icon: Users, count: countryTeams.data.length },
    { id: 'players', label: 'Jogadores', icon: User, count: countryPlayers.data.length },
    { id: 'stadiums', label: 'Estádios', icon: Building, count: countryStadiums.data.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/countries"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
            <Flag className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentCountry.data.name}</h1>
            <p className="text-gray-600">Perfil do País</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <Badge variant="secondary" size="sm">{tab.count}</Badge>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'teams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryTeams.loading ? (
              <LoadingSpinner text="Loading teams..." />
            ) : countryTeams.data.length > 0 ? (
              countryTeams.data.map((team) => (
                <Link key={team.id} to={`/teams/${team.id}`}>
                  <Card hover>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{team.name}</h3>
                        {team.nickname && (
                          <p className="text-sm text-gray-600">"{team.nickname}"</p>
                        )}
                        <p className="text-sm text-gray-500">{team.city}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum time encontrado para este país.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'players' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {countryPlayers.loading ? (
              <LoadingSpinner text="Carregando jogadores..." />
            ) : countryPlayers.data.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {countryPlayers.data.map((player) => (
                  <li key={player.id}>
                    <Link 
                      to={`/players/${player.id}`}
                      className="block hover:bg-gray-50 px-4 py-4 sm:px-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{player.name}</p>
                            <p className="text-sm text-gray-500">{player.position}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">{player.position}</Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum jogador encontrado para este país.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stadiums' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryStadiums.loading ? (
              <LoadingSpinner text="Carregando estádios..." />
            ) : countryStadiums.data.length > 0 ? (
              countryStadiums.data.map((stadium) => (
                <Card key={stadium.id}>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{stadium.name}</h3>
                      <p className="text-sm text-gray-500">{stadium.city}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum estádio encontrado para este país.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDetailPage;