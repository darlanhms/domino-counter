import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import useTeams, { Team } from '../hooks/useTeams';

interface WinnerModalProps {
  onClose: () => void;
  winner: Team | undefined;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ onClose, winner }) => {
  const { calculateTeamPoints, clearAllPoints } = useTeams();

  const handleClear = () => {
    clearAllPoints();
    onClose();
  };

  if (!winner) {
    return <></>;
  }

  return (
    <Modal isCentered isOpen={!!winner} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Temos um vencedor!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={2}>
            <Text>Parabéns ao time</Text>
            <Text fontSize="2xl" fontWeight="bold">
              {winner.name}
            </Text>
            <Text>por ter feito {calculateTeamPoints(winner)} pontos! 🎉</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" mr={3} variant="outline" onClick={handleClear}>
            Limpar pontos
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WinnerModal;
