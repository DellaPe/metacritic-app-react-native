import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { Game } from "../lib/metacritic";
import { Score } from "./Score";

interface GameCardProps {
  game: Game;
}

interface AnimatedGameCardProps extends GameCardProps {
  index: number;
}

export function GameCard({ game }: GameCardProps) {
  const lengthFactor = 97;
  const gameDescription =
    game.description.length > lengthFactor
      ? game.description.substring(0, lengthFactor) + "..."
      : game.description;

  return (
    <View key={game.slug} style={styles.row}>
      <Image
        source={{ uri: game.image }}
        alt={game.title}
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.releaseDate}>{game.releaseDate}</Text>
        <Score score={game.score} />
        <Text style={styles.description}>{gameDescription}</Text>
      </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    padding: 5,
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
  description: {
    color: "white",
    fontSize: 16,
    opacity: 0.7,
  },
});
