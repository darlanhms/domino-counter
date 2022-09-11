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
} from '@chakra-ui/react';
import useTeams from '../hooks/useTeams';

interface ClearPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClearPointsModal: React.FC<ClearPointsModalProps> = ({ isOpen, onClose }) => {
  const { clearAllPoints } = useTeams();

  const handleClear = () => {
    clearAllPoints();
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar limpeza</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight={600}>Tem certeza que deseja LIMPAR TODOS OS PONTOS NA MESA?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" mr={3} variant="outline" onClick={handleClear}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ClearPointsModal;
