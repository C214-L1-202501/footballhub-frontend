import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { 
  fetchTeam, 
  fetchTeamPlayers, 
  fetchTeamParticipations 
} from '../store/slices/teamsSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { Users, User, Trophy, ArrowLeft, Calendar, MapPin } from 'lucide-react';

const TeamDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { 
    currentTeam, 
    teamPlayers, 
    teamParticipations 
  } = useAppSelector(state => state.teams);
  
  const [activeTab, setActiveTab] = useState<'players' | 'history'>('players');

  useEffect(() => {
    if (id) {
      const teamId = parseInt(id);
      dispatch(fetchTeam(teamId));
      dispatch(fetchTeamPlayers(teamId));
      dispatch(fetchTeamParticipations(teamId));
    }
  }, [dispatch, id]);

  if (currentTeam.loading) {
    return <LoadingSpinner text="Carregando detalhes do time..." />;
  }

  if (currentTeam.error || !currentTeam.data) {
    return (
      <ErrorMessage 
        message={currentTeam.error || 'Time não encontrado'} 
        onRetry={() => id && dispatch(fetchTeam(parseInt(id)))}
      />
    );
  }

  const team = currentTeam.data;
  const foundingYear = new Date(team.founding_date).getFullYear();

  const tabs = [
    { id: 'players', label: 'Elenco', icon: User, count: teamPlayers.data.length },
    { id: 'history', label: 'Histórico', icon: Trophy, count: teamParticipations.data.length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/teams"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-6">
            <Users className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{team.name}</h1>
            {team.nickname && (
              <p className="text-lg text-gray-600">"{team.nickname}"</p>
            )}
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {team.city}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Fundado em {foundingYear}
              </div>
            </div>
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
        {activeTab === 'players' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {teamPlayers.loading ? (
              <LoadingSpinner text="Loading squad..." />
            ) : teamPlayers.data.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {teamPlayers.data.map((player) => (
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
                            <p className="text-sm text-gray-500">
                              {new Date().getFullYear() - new Date(player.birth_date).getFullYear()} anos
                            </p>
                          </div>
                        </div>
                        <Badge variant="primary">{player.position}</Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum jogador encontrado para este time.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamParticipations.loading ? (
              <LoadingSpinner text="Carregando histórico de campeonatos..." />
            ) : teamParticipations.data.length > 0 ? (
              teamParticipations.data.map((participation, index) => (
                <Card key={index}>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{participation.championship_name}</h3>
                      <p className="text-sm text-gray-600">Temporada: {participation.season}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum histórico de campeonato encontrado para este time.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamDetailPage;