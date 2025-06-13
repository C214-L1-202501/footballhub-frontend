import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchPlayer } from '../store/slices/playersSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { User, ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';

const PlayerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentPlayer } = useAppSelector(state => state.players);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlayer(parseInt(id)));
    }
  }, [dispatch, id]);

  if (currentPlayer.loading) {
    return <LoadingSpinner text="Carregando detalhes do jogador..." />;
  }

  if (currentPlayer.error || !currentPlayer.data) {
    return (
      <ErrorMessage 
        message={currentPlayer.error || 'Jogador não encontrado'} 
        onRetry={() => id && dispatch(fetchPlayer(parseInt(id)))}
      />
    );
  }

  const player = currentPlayer.data;
  const country = player.country;
  const team = player.team;
  const position = player.position;
  const birthDate = new Date(player.birth_date);
  const age = Math.floor((Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/players"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div className="flex items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-6">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{player.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="primary" size="lg">{position}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Player Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Idade</h3>
              <p className="text-gray-600">{age} anos</p>
              <p className="text-sm text-gray-500">{birthDate.toLocaleDateString()}</p>
            </div>
          </div>
        </Card>

        {country && (
          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Nacionalidade</h3>
                <p className="text-gray-500">{country}</p>
              </div>
            </div>
          </Card>
        )}

        {team && (
          <Card>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Time Atual</h3>
                <p className="text-sm text-gray-500">{team}</p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Player Stats or Additional Info */}
      <Card>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Informações do Jogador</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Nome Completo</span>
            <span className="text-gray-900">{player.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Posição</span>
            <Badge variant="primary">{position}</Badge>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="font-medium text-gray-700">Idade</span>
            <span className="text-gray-900">{age} anos</span>
          </div>
          {country && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="font-medium text-gray-700">Nacionalidade</span>
              <span className="text-gray-900">{country}</span>
            </div>
          )}
          {team && (
            <div className="flex justify-between items-center py-2">
              <span className="font-medium text-gray-700">Time Atual</span>
              <span className="text-gray-900">{team}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PlayerDetailPage;