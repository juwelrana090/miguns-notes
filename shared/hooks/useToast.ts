import Toast from 'react-native-toast-message';

interface ToastConfig {
  title: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom';
}

export const useToast = () => {
  const showSuccess = ({ title, message, duration = 2500, position = 'top' }: ToastConfig) => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: duration,
      position,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showError = ({ title, message, duration = 2500, position = 'top' }: ToastConfig) => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      visibilityTime: duration,
      position,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showInfo = ({ title, message, duration = 2500, position = 'top' }: ToastConfig) => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: duration,
      position,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showWarning = ({ title, message, duration = 2500, position = 'top' }: ToastConfig) => {
    Toast.show({
      type: 'warning',
      text1: title,
      text2: message,
      visibilityTime: duration,
      position,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const hide = () => {
    Toast.hide();
  };

  const hideAll = () => {
    Toast.hide();
  };

  // Additional utility methods for enhanced functionality
  const showCustom = (config: {
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
    duration?: number;
    position?: 'top' | 'bottom';
  }) => {
    Toast.show({
      type: config.type,
      text1: config.title,
      text2: config.message,
      visibilityTime: config.duration || 4000,
      position: config.position || 'top',
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showCustom,
    hide,
    hideAll,
  };
};
