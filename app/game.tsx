import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function randomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function GameScreen() {
  const router = useRouter();
  const [baseNumber] = useState(randomNumber);
  const [hiddenNumber] = useState(() => {
    let value = randomNumber();
    while (value === baseNumber) {
      value = randomNumber();
    }
    return value;
  });
  const higherScale = useRef(new Animated.Value(1)).current;
  const lowerScale = useRef(new Animated.Value(1)).current;

  const animatePress = (value: Animated.Value, toValue: number) => {
    Animated.spring(value, {
      toValue,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const guess = (choice: 'higher' | 'lower') => {
    const isWin = choice === 'higher' ? hiddenNumber > baseNumber : hiddenNumber < baseNumber;

    router.replace({
      pathname: '/result',
      params: {
        status: isWin ? 'win' : 'lose',
        baseNumber: String(baseNumber),
        score: String(hiddenNumber),
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.startingText}>Starting: {baseNumber}</Text>

      <AnimatedPressable
        style={[styles.button, styles.higherButton, { transform: [{ scale: higherScale }] }]}
        onPressIn={() => animatePress(higherScale, 0.9)}
        onPressOut={() => animatePress(higherScale, 1)}
        onPress={() => guess('higher')}>
        <Text style={styles.buttonText}>Higher</Text>
      </AnimatedPressable>

      <AnimatedPressable
        style={[styles.button, styles.lowerButton, { transform: [{ scale: lowerScale }] }]}
        onPressIn={() => animatePress(lowerScale, 0.9)}
        onPressOut={() => animatePress(lowerScale, 1)}
        onPress={() => guess('lower')}>
        <Text style={styles.buttonText}>Lower</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    backgroundColor: '#FFFFFF',
  },
  startingText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111111',
  },
  button: {
    width: 160,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  higherButton: {
    backgroundColor: '#16A34A',
  },
  lowerButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});