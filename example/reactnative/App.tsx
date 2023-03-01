import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressivelyProvider } from "../../packages/react-native/src";

export default function App() {
  return (
    <ProgressivelyProvider
      clientKey={"abd"}
      apiUrl={"http://localhost:4000"}
      websocketUrl="ws://localhost:4000"
    >
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app fefe!</Text>
        <StatusBar style="auto" />
      </View>
    </ProgressivelyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
