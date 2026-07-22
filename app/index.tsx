import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Alert, Animated, Pressable, StyleSheet, Text, View } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const LONG_PRESS_DURATION = 600;

export default function HomeScreen() {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Alert.alert('', 'Long press to start the game', [{ text: 'OK' }]);
  };

  const handleLongPress = () => {
    router.push('/game');
  };

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 1.25,
      duration: LONG_PRESS_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <AnimatedPressable
        style={[styles.startButton, { transform: [{ scale }] }]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        delayLongPress={LONG_PRESS_DURATION}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Text style={styles.startButtonText}>Start game!</Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  startButton: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#8E1BB5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
});