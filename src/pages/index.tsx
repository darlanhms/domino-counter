import { Box, Center, Container, Flex, IconButton, Text, useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import SettingsModal from '../components/SettingsModal';
import TeamBoard from '../components/TeamBoard';
import WinnerModal from '../components/WinnerModal';
import useSettings from '../hooks/useSettings';
import useTeams, { Team } from '../hooks/useTeams';

export default function Home(): React.ReactElement {
  const { teams, calculateTeamPoints } = useTeams();
  const { settings } = useSettings();
  const [settingsModalOpen, setSettingsModalOpen] = useBoolean(false);
  const [winner, setWinner] = useState<Team>();

  // checar possível vitória
  useEffect(() => {
    const winner = teams.find(team => {
      const teamPoints = calculateTeamPoints(team);

      const { winningPoints } = settings;

      return teamPoints >= winningPoints;
    });

    if (winner) {
      setWinner(winner);
    }
  }, [teams, settings]);

  return (
    <Container height="100vh" p={0}>
      <Center position="relative" mb={4} py={4} mx={2} borderBottomWidth="1px" borderBottomColor="gray.600">
        <Text textAlign="center" fontSize="lg" fontWeight={600}>
          CONTADOR DE DOMINÓ
        </Text>
        <Box position="absolute" right="5px">
          <IconButton
            aria-label="Configurações"
            variant="outline"
            borderColor="transparent"
            _hover={{
              bgColor: 'transparent',
            }}
            onClick={setSettingsModalOpen.on}
          >
            <FaCog />
          </IconButton>
        </Box>
      </Center>
      <Flex>
        {teams?.map((team, index) => (
          <TeamBoard team={team} key={team.id} isLastTeam={index === teams.length - 1} />
        ))}
      </Flex>

      <SettingsModal isOpen={settingsModalOpen} onClose={setSettingsModalOpen.off} />

      <WinnerModal winner={winner} onClose={() => setWinner(undefined)} />
    </Container>
  );
}
