import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

interface AnimatedChatItemProps {
  children: React.ReactNode;
  isDeleting: boolean;
  onDeleteComplete?: () => void;
}

export function AnimatedChatItem({ children, isDeleting, onDeleteComplete }: AnimatedChatItemProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const height = useSharedValue(1);

  useEffect(() => {
    if (isDeleting) {
      // Sequence of animations for deletion
      
      // 1. Shake effect to indicate deletion
      translateX.value = withSpring(5, { damping: 8, stiffness: 300 }, () => {
        translateX.value = withSpring(-5, { damping: 8, stiffness: 300 }, () => {
          translateX.value = withSpring(0, { damping: 10, stiffness: 300 });
        });
      });

      // 2. Scale down and fade out
      scale.value = withTiming(0.95, { 
        duration: 200, 
        easing: Easing.inOut(Easing.ease) 
      }, () => {
        scale.value = withTiming(0.8, { 
          duration: 300, 
          easing: Easing.in(Easing.ease) 
        });
      });

      opacity.value = withTiming(0.7, { 
        duration: 200,
        easing: Easing.inOut(Easing.ease) 
      }, () => {
        opacity.value = withTiming(0, { 
          duration: 300, 
          easing: Easing.in(Easing.ease) 
        });
      });

      // 3. Collapse height
      height.value = withTiming(0, { 
        duration: 400, 
        easing: Easing.inOut(Easing.ease) 
      }, (finished) => {
        if (finished && onDeleteComplete) {
          runOnJS(onDeleteComplete)();
        }
      });
    }
  }, [isDeleting, opacity, scale, translateX, height, onDeleteComplete]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
    ],
    height: height.value === 1 ? undefined : height.value * 60, // Approximate chat item height
    overflow: 'hidden',
  }));

  return (
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}