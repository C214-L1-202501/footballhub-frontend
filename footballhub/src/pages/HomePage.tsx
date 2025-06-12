import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchChampionships } from '../store/slices/championshipsSlice';
import { fetchTeams } from '../store/slices/teamsSlice';
import SearchBar from '../components/common/SearchBar';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { Trophy, Users, TrendingUp, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { championships } = useAppSelector(state => state.championships);
  const { teams } = useAppSelector(state => state.teams);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchChampionships());
    dispatch(fetchTeams());
  }, [dispatch]);

  const featuredChampionships = championships.data.slice(0, 4);
  const popularTeams = teams.data.slice(0, 6);

  if (championships.loading || teams.loading) {
    return <LoadingSpinner text="Loading football data..." />;
  }

  if (championships.error || teams.error) {
    return (
      <ErrorMessage 
        message={championships.error || teams.error || 'Failed to load data'} 
        onRetry={() => {
          dispatch(fetchChampionships());
          dispatch(fetchTeams());
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Welcome to FootballHub</h1>
          <p className="text-lg mb-6 opacity-90">
            Your ultimate destination for football statistics, team information, and player profiles. 
            Explore the world of football with comprehensive data at your fingertips.
          </p>
          <div className="max-w-md">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search teams, players, championships..."
              className="bg-white/20 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{teams.data.length}+</h3>
          <p className="text-gray-600">Teams</p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
            <Trophy className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{championships.data.length}+</h3>
          <p className="text-gray-600">Championships</p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Live</h3>
          <p className="text-gray-600">Statistics</p>
        </Card>
        
        <Card className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-4">
            <Star className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
          <p className="text-gray-600">Analysis</p>
        </Card>
      </div>

      {/* Major Championships */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Major Championships</h2>
          <Link 
            to="/championships" 
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View All →
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
          <h2 className="text-2xl font-bold text-gray-900">Popular Teams</h2>
          <Link 
            to="/teams" 
            className="text-green-600 hover:text-green-700 font-medium"
          >
            View All →
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