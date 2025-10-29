import { Alert } from 'react-native';

interface DeleteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
}

export function DeleteChatModal({ isOpen, onClose, onConfirm, isDeleting }: DeleteChatModalProps) {
  if (isOpen && !isDeleting) {
    Alert.alert(
      'Eliminar Chat',
      '¿Estás seguro de que quieres eliminar este chat? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: onClose,
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: onConfirm,
        },
      ]
    );
  }

  return null;
}