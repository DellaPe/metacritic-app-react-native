import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { type Game, getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard, GameCard } from "./GameCard";
import { Logo } from "./Logo";

export function Main() {
  const [games, setGames] = useState<Game[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames()
      .then(res => {
        setGames(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 10,
      }}>
      <View style={styles.logo}>
        <Logo />
      </View>

      {games.length === 0 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={games}
          keyExtractor={game => String(game.slug)}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: "center",
    marginBottom: 20,
  },
});
