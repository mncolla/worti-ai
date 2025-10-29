import * as Haptics from 'expo-haptics';

const DEBUG_HAPTICS = __DEV__; // Only show in development

export const useHaptics = () => {
  const triggerImpact = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium, debugLabel?: string) => {
    try {
      Haptics.impactAsync(style);
      
      if (DEBUG_HAPTICS && debugLabel) {
        console.log(`🔥 Haptic: ${debugLabel}`);
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  };

  const triggerNotification = (type: Haptics.NotificationFeedbackType = Haptics.NotificationFeedbackType.Success, debugLabel?: string) => {
    try {
      Haptics.notificationAsync(type);
      
      if (DEBUG_HAPTICS && debugLabel) {
        console.log(`🔔 Haptic Notification: ${debugLabel}`);
      }
    } catch (error) {
      console.warn('Notification haptic feedback not available:', error);
    }
  };

  const triggerSelection = (debugLabel?: string) => {
    try {
      Haptics.selectionAsync();
      
      if (DEBUG_HAPTICS && debugLabel) {
        console.log(`👆 Haptic Selection: ${debugLabel}`);
      }
    } catch (error) {
      console.warn('Selection haptic feedback not available:', error);
    }
  };

  return {
    light: (label?: string) => triggerImpact(Haptics.ImpactFeedbackStyle.Light, label || 'Light Impact'),
    
    medium: (label?: string) => triggerImpact(Haptics.ImpactFeedbackStyle.Medium, label || 'Medium Impact'),
    
    heavy: (label?: string) => triggerImpact(Haptics.ImpactFeedbackStyle.Heavy, label || 'Heavy Impact'),
    
    success: (label?: string) => triggerNotification(Haptics.NotificationFeedbackType.Success, label || 'Success'),
    
    warning: (label?: string) => triggerNotification(Haptics.NotificationFeedbackType.Warning, label || 'Warning'),
    
    error: (label?: string) => triggerNotification(Haptics.NotificationFeedbackType.Error, label || 'Error'),
    
    selection: (label?: string) => triggerSelection(label || 'Selection'),
  };
};