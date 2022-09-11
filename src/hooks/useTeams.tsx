import { createContext, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import useAlert from './useAlert';
import useLocalStorage from './useLocalStorage';

export interface Point {
  id: string;
  value: number;
}

export interface Team {
  id: string;
  name: string;
  points: Array<Point>;
}

interface EditTeamFn {
  (teamId: string, newProps: Partial<Team>): void;
}

interface EditPointFn {
  (teamId: string, pointId: string, newValue: number): void;
}

interface AddPointFn {
  (teamId: string): void;
}

interface ITeamsContext {
  teams: Array<Team>;
  editTeam: EditTeamFn;
  editPoint: EditPointFn;
  addPoint: AddPointFn;
  clearAllPoints: () => void;
  calculateTeamPoints: (team: Team) => number;
}

const TeamsContext = createContext<ITeamsContext>({} as ITeamsContext);

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const alert = useAlert();
  const [teams, setTeams] = useLocalStorage<Array<Team>>('teams', [
    {
      id: uuid(),
      name: 'Nós',
      points: [
        {
          id: uuid(),
          value: 0,
        },
      ],
    },
    {
      id: uuid(),
      name: 'Eles',
      points: [
        {
          id: uuid(),
          value: 0,
        },
      ],
    },
  ]);

  const editTeam: EditTeamFn = (teamId, newProps) => {
    setTeams(
      teams?.map(team => {
        if (team.id === teamId) {
          return {
            ...team,
            ...newProps,
          };
        }

        return team;
      }),
    );
  };

  const findTeamById = (teamId: string): Team | undefined => {
    return teams?.find(({ id }) => teamId === id);
  };

  const editPoint: EditPointFn = (teamId, pointId, newValue) => {
    const team = findTeamById(teamId);

    if (team) {
      // se o valor é zerado remover das pontuações
      if (!newValue) {
        const newPoints = team.points.filter(point => point.id !== pointId);

        editTeam(teamId, {
          points: newPoints,
        });
        return;
      }

      // editar pontuação
      const newPoints = team.points.map(point => {
        if (point.id === pointId) {
          return {
            ...point,
            value: newValue,
          };
        }

        return point;
      });

      editTeam(teamId, {
        points: newPoints,
      });
    }
  };

  const addPoint = (teamId: string) => {
    const team = findTeamById(teamId);

    if (team) {
      const lastPoint = team.points[team.points.length - 1];

      if (lastPoint && lastPoint.value === 0) {
        alert.error('Último valor zerado', 'Edite o valor no lugar de adicionar um novo');
        return;
      }

      editTeam(teamId, {
        points: [
          ...team.points,
          {
            id: uuid(),
            value: 0,
          },
        ],
      });
    }
  };

  const clearAllPoints = () => {
    setTeams(
      teams?.map(team => ({
        ...team,
        points: [
          {
            value: 0,
            id: uuid(),
          },
        ],
      })),
    );
  };

  const calculateTeamPoints = (team: Team): number => {
    return team.points.reduce((previousValue, point) => previousValue + point.value, 0);
  };

  return (
    <TeamsContext.Provider
      value={{ teams: teams || [], editTeam, editPoint, addPoint, clearAllPoints, calculateTeamPoints }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export default function useTeams(): ITeamsContext {
  const teamsContext = useContext(TeamsContext);

  if (!TeamsContext) {
    throw new Error('Invalid teams context');
  }

  return teamsContext;
}
