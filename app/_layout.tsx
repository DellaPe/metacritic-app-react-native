import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Logo } from "../components/Logo";
import { Slot } from "expo-router";

export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        <View
          style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingHorizontal: 10,
          }}>
          <View style={styles.logo}>
            <Logo />
          </View>

          <Slot />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  logo: {
    alignItems: "center",
  },
});
