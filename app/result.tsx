import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

type ResultParams = {
  status?: string;
  baseNumber?: string;
  score?: string;
};

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<ResultParams>();

  const isWin = params.status === 'win';
  const baseNumber = Number(params.baseNumber ?? 0);
  const score = Number(params.score ?? 0);

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const trophyScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 8 }),
    ]).start();

    if (isWin) {
      Animated.sequence([
        Animated.delay(200),
        Animated.spring(trophyScale, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 14 }),
      ]).start();
    }
  }, [isWin, opacity, scale, trophyScale]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.resultText, { opacity, transform: [{ scale }] }]}>
        {isWin ? "You've won" : "You've lost"}
        {'\n'}baseNumber was {baseNumber} and score {score}
      </Animated.Text>

      {isWin ? (
        <Animated.Text style={[styles.trophy, { transform: [{ scale: trophyScale }] }]}>
          🏆
        </Animated.Text>
      ) : null}

      <Pressable style={styles.playAgainButton} onPress={() => router.replace('/')}>
        <Text style={styles.playAgainText}>Play again</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  resultText: {
    fontSize: 42,
    lineHeight: 52,
    textAlign: 'center',
    color: '#111111',
  },
  trophy: {
    marginTop: 18,
    fontSize: 80,
  },
  playAgainButton: {
    marginTop: 30,
    backgroundColor: '#1D4ED8',
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  playAgainText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});