import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchChampionships } from '../store/slices/championshipsSlice';
import { fetchTeams } from '../store/slices/teamsSlice';
import { fetchPlayers } from '../store/slices/playersSlice';
import { fetchCountries } from '../store/slices/countriesSlice';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Trophy, Users, User, Flag } from 'lucide-react';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { championships } = useAppSelector(state => state.championships);
  const { teams } = useAppSelector(state => state.teams);
  const { players } = useAppSelector(state => state.players);
  const { countries } = useAppSelector(state => state.countries);

  useEffect(() => {
    dispatch(fetchChampionships());
    dispatch(fetchTeams());
    dispatch(fetchPlayers());
    dispatch(fetchCountries());
  }, [dispatch]);

  const featuredChampionships = championships.data.slice(0, 4);
  const popularTeams = teams.data.slice(0, 6);

  if (championships.loading || teams.loading || players.loading || countries.loading) {
    return <LoadingSpinner text="Carregando dados de futebol..." />;
  }

  if (championships.error || teams.error || players.error || countries.error) {
    return (
      <ErrorMessage
        message={championships.error || teams.error || players.error || countries.error || 'Failed to load data'}
        onRetry={() => {
          dispatch(fetchChampionships());
          dispatch(fetchTeams());
          dispatch(fetchPlayers());
          dispatch(fetchCountries());
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo ao FootballHub</h1>
          <p className="text-lg mb-6 opacity-90">
            Seu destino final para estatísticas de futebol, informações sobre equipes e perfis de jogadores.
            Explore o mundo do futebol com dados abrangentes ao seu alcance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{teams.data.length}</h3>
          <p className="text-gray-600">Times</p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <Trophy className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{championships.data.length}</h3>
          <p className="text-gray-600">Campeonatos</p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <User className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{players.data.length}</h3>
          <p className="text-gray-600">Jogadores</p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-4">
            <Flag className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{countries.data.length}</h3>
          <p className="text-gray-600">Países</p>
        </Card>
      </div>

      

      {/* Major Championships */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Campeonatos Principais</h2>
          <Link 
            to="/championships" 
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Ver Todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredChampionships.map((championship) => (
            <Card key={championship.id} hover>
              <div className="flex items-center mb-4">
                <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">{championship.name}</h3>
                  <p className="text-sm text-gray-600">Season {championship.season}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Teams */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Times Populares</h2>
          <Link 
            to="/teams" 
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Ver Todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTeams.map((team) => (
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;