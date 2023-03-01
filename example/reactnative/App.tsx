import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ProgressivelyProvider,
  useFlags,
} from "../../packages/react-native/src";

const Flagged = () => {
  const { flags } = useFlags();

  return <Text>{JSON.stringify(flags)}</Text>;
};

export default function App() {
  return (
    <ProgressivelyProvider
      clientKey={"valid-sdk-key"}
      apiUrl={"http://localhost:4000"}
      websocketUrl="ws://localhost:4000"
    >
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app fefe!</Text>
        <Flagged />
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
