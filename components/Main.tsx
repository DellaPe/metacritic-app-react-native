import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { type Game, getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";

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
