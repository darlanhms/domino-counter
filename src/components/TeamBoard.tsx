import {
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  EditableProps,
  Grid,
  VStack,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import useTeams, { Team } from '../hooks/useTeams';

interface TeamBoardProps {
  team: Team;
  isLastTeam: boolean;
}

const EditableValue: React.FC<EditableProps> = props => {
  return (
    <Editable fontSize="xl" fontWeight={500} textAlign="center" {...props}>
      <EditablePreview />
      <EditableInput type="number" />
    </Editable>
  );
};

const TeamBoard: React.FC<TeamBoardProps> = ({ team, isLastTeam }) => {
  const { editTeam, editPoint, addPoint, calculateTeamPoints } = useTeams();

  return (
    <Grid
      w="100%"
      height="calc(100vh - 60px - 1rem)"
      key={team.id}
      borderRightWidth={isLastTeam ? '0px' : '2px'}
      borderRightColor="gray.600"
      templateColumns="1fr"
      templateRows="35px 1fr 3.5rem"
    >
      <Editable
        defaultValue={team.name}
        fontSize="xl"
        fontWeight={600}
        textAlign="center"
        mx={2}
        onSubmit={value => editTeam(team.id, { name: value })}
      >
        <EditablePreview />
        <EditableInput />
      </Editable>

      <VStack mt={2}>
        {team.points.map((point, index) => (
          <EditableValue
            key={point.id}
            defaultValue={String(point.value)}
            isDisabled={index !== team.points.length - 1}
            onSubmit={value => editPoint(team.id, point.id, Number(value))}
          >
            <EditablePreview />
            <EditableInput type="number" />
          </EditableValue>
        ))}
        {team.points.length > 1 && (
          <>
            <Divider borderColor="black" width="60%" />
            <EditableValue value={String(calculateTeamPoints(team))} isDisabled>
              <EditablePreview />
              <EditableInput type="number" />
            </EditableValue>
          </>
        )}
      </VStack>

      <Button
        position="sticky"
        bottom={0}
        width="100%"
        borderRadius="0px"
        colorScheme="blackAlpha"
        bgColor="gray.800"
        h={14}
        _hover={{
          bgColor: 'gray.700',
        }}
        onClick={() => addPoint(team.id)}
      >
        <FaPlus />
      </Button>
    </Grid>
  );
};

export default TeamBoard;
