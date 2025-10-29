import { UIMessage } from 'ai';
import { useEffect, useRef } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface NewMessageAnimationProps {
  message: UIMessage;
  children: React.ReactNode;
  isNewMessage?: boolean;
}

export function NewMessageAnimation({ message, children, isNewMessage = false }: NewMessageAnimationProps) {
  const opacity = useSharedValue(isNewMessage ? 0 : 1);
  const translateY = useSharedValue(isNewMessage ? 30 : 0);
  const scale = useSharedValue(isNewMessage ? 0.8 : 1);
  const prevMessageId = useRef(message.id);

  useEffect(() => {
    if (isNewMessage || prevMessageId.current !== message.id) {
      prevMessageId.current = message.id;
      
      const isUser = message.role === 'user';
      
      if (isUser) {
        opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
        translateY.value = withSpring(0, { damping: 15, stiffness: 200, mass: 1 });
        scale.value = withSequence(
          withTiming(1.05, { duration: 200 }),
          withSpring(1, { damping: 10, stiffness: 300 })
        );
      } else {
        opacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
        translateY.value = withSpring(0, { damping: 20, stiffness: 150, mass: 1.2 });
        scale.value = withSequence(
          withTiming(1.02, { duration: 300 }),
          withSpring(1, { damping: 12, stiffness: 250 })
        );
      }
    }
  }, [message.id, isNewMessage, opacity, translateY, scale]);

  const isUser = message.role === 'user';

  const animatedStyle = useAnimatedStyle(() => {
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
    <Animated.View style={animatedStyle}>
      {children}
    </Animated.View>
  );
}