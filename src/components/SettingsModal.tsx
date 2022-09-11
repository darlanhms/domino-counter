import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
  VStack,
} from '@chakra-ui/react';
import { IoMdWarning } from 'react-icons/io';
import useAlert from '../hooks/useAlert';
import useSettings from '../hooks/useSettings';
import ClearPointsModal from './ClearPointsModal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, setSettings } = useSettings();
  const [clearPointsModalOpen, setClearPointsModalOpen] = useBoolean(false);
  const alert = useAlert();

  const handleChangeWinningPoints = (newWinningPoints: number) => {
    if (!newWinningPoints) {
      alert.error('Informe um valor', 'Pontuação para finalizar deve ser maior que 0');
      return;
    }

    setSettings({ ...settings, winningPoints: newWinningPoints });
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurações</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} align="flex-start">
              <FormControl>
                <FormLabel>Pontuação para finalizar o jogo</FormLabel>
                <Input
                  defaultValue={settings.winningPoints}
                  onBlur={e => handleChangeWinningPoints(Number(e.target.value))}
                  type="number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Limpar pontuações</FormLabel>
                <Button colorScheme="red" onClick={setClearPointsModalOpen.on}>
                  <IoMdWarning style={{ marginRight: '5px' }} /> Limpar
                </Button>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ClearPointsModal isOpen={clearPointsModalOpen} onClose={setClearPointsModalOpen.off} />
    </>
  );
};

export default SettingsModal;
