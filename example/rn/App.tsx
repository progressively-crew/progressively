import { StyleSheet, Text, View } from "react-native";
import { ProgressivelyProvider, useFlags } from "@progressively/react";

const FlaggedComponent = () => {
  const { flags } = useFlags();

  if (flags.newHomepage) {
    return <Text>New variant</Text>;
  }

  return <Text>Old variant</Text>;
};

export default function App() {
  return (
    <ProgressivelyProvider clientKey="valid-sdk-key">
      <View style={styles.container}>
        <FlaggedComponent />
        <Text>Hello world</Text>
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
