import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  score: string;
}

export function Score({ score }: Props) {
  const maxScore = 100;
  const getColor = (score: string) => {
    const scoreNumber = parseInt(score);
    const percentage = (scoreNumber / maxScore) * 100;
    if (percentage < 97) return "red";
    if (percentage < 98) return "yellow";
    return "green";
  };

  return (
    <View style={[styles.container, { backgroundColor: getColor(score) }]}>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderRadius: 50, // Esto asegura que sea redondo
    width: 35, // Ancho fijo
    height: 35, // Altura fija igual al ancho
    alignItems: "center",
    justifyContent: "center", // Centra el texto dentro del círculo
  },
  score: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
});
