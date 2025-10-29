import { useEffect } from 'react';
import { XStack, YStack, Text } from 'tamagui';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  withSequence,
} from 'react-native-reanimated';

interface TypingIndicatorProps {
  isVisible: boolean;
}

const AnimatedDot = ({ delay }: { delay: number }) => {
  const opacity = useSharedValue(0.3);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    const animation = () => {
      opacity.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.3, { duration: 400, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          false
        )
      );
      
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1.2, { duration: 400, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.8, { duration: 400, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          false
        )
      );
    };

    animation();
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <YStack
        width={6}
        height={6}
        borderRadius={3}
        backgroundColor="$blue9"
      />
    </Animated.View>
  );
};

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  const containerOpacity = useSharedValue(0);
  const containerScale = useSharedValue(0.9);

  useEffect(() => {
    if (isVisible) {
      containerOpacity.value = withTiming(1, { duration: 200 });
      containerScale.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.back(1.2)) });
    } else {
      containerOpacity.value = withTiming(0, { duration: 150 });
      containerScale.value = withTiming(0.9, { duration: 150 });
    }
  }, [isVisible, containerOpacity, containerScale]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ scale: containerScale.value }],
  }));

  if (!isVisible) return null;

  return (
    <Animated.View style={containerAnimatedStyle}>
      <YStack
        backgroundColor="$gray2"
        padding="$3"
        marginVertical="$2"
        marginLeft="$2"
        marginRight="$8"
        borderRadius="$4"
        borderTopLeftRadius="$1"
      >
        <XStack alignItems="center" gap="$2">
          <Text fontSize="$3" color="$gray11" marginRight="$2">
            IA está escribiendo
          </Text>
          <XStack gap="$1" alignItems="center">
            <AnimatedDot delay={0} />
            <AnimatedDot delay={200} />
            <AnimatedDot delay={400} />
          </XStack>
        </XStack>
      </YStack>
    </Animated.View>
  );
}