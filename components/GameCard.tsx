import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { Game } from "../lib/metacritic";
import { useEffect, useRef } from "react";

interface GameCardProps {
  game: Game;
}

interface AnimatedGameCardProps extends GameCardProps {
  index: number;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <View key={game.slug}>
      <View style={styles.grid}>
        <Image
          source={{ uri: game.image }}
          alt={game.title}
          style={styles.image}
        />
        <View style={styles.col}>
          <Text style={styles.score}>{game.score}</Text>
          <Text style={styles.releaseDate}>{game.releaseDate}</Text>
        </View>
      </View>
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.description}>{game.description}</Text>
    </View>
  );
}

export function AnimatedGameCard({ game, index }: AnimatedGameCardProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 150,
    borderRadius: 5,
    resizeMode: "stretch",
  },
  grid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  col: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  releaseDate: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
  score: {
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
  },
  description: {
    color: "white",
    fontSize: 16,
    opacity: 0.7,
  },
});
