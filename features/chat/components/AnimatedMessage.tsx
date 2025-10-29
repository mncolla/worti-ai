import { UIMessage } from 'ai';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedMessageProps {
  message: UIMessage;
  children: React.ReactNode;
  index: number;
}

export function AnimatedMessage({ message, children, index }: AnimatedMessageProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    const staggerDelay = Math.min(index * 50, 300);
    
    opacity.value = withDelay(
      staggerDelay,
      withTiming(1, { 
        duration: 400, 
        easing: Easing.out(Easing.ease),
      })
    );
    
    translateY.value = withDelay(
      staggerDelay,
      withSpring(0, {
        damping: 15,
        stiffness: 150,
        mass: 1,
      })
    );
    
    scale.value = withDelay(
      staggerDelay,
      withSpring(1, {
        damping: 12,
        stiffness: 200,
        mass: 0.8,
      })
    );
  }, [opacity, translateY, scale, index]);

  const isUser = message.role === 'user';
  
  const messageAnimatedStyle = useAnimatedStyle(() => {
    if (isUser) {
      return {
        opacity: opacity.value,
        transform: [
          { translateX: translateY.value },
          { scale: scale.value },
        ],
      };
    } else {
      return {
        opacity: opacity.value,
        transform: [
          { translateY: translateY.value },
          { scale: scale.value },
        ],
      };
    }
  });

  return (
    <Animated.View style={messageAnimatedStyle}>
      {children}
    </Animated.View>
  );
}