import { useToast } from '@chakra-ui/react';

interface AlertFn {
  (title: string, description?: string, duration?: number): void;
}

interface UseAlert {
  success: AlertFn;
  error: AlertFn;
}

export default function useAlert(): UseAlert {
  const toast = useToast();

  const success: AlertFn = (title, description, duration) => {
    toast({
      title,
      description,
      status: 'success',
      duration: duration || 2000,
      isClosable: true,
      position: 'bottom',
    });
  };

  const error: AlertFn = (title, description, duration) => {
    toast({
      title,
      description,
      status: 'error',
      duration: duration || 2000,
      isClosable: true,
      position: 'bottom',
    });
  };

  return {
    success,
    error,
  };
}
