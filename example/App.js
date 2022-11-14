import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useGlobalCallback, useGlobalState } from "hook-global-state";
import { useEffect } from "react";

const TopComponent = () => {
  const callback = useGlobalCallback("callback");
  const [count, setCount] = useGlobalState("count");

  return (
    <>
      <Button title="Add to Count" onPress={setCount((c) => c + 1)} />
      <Button title="Alert with count" onPress={() => callback(count)} />
    </>
  );
};

const BottomComponent = () => {
  const callback = useGlobalCallback("callback");
  const [count, setCount] = useGlobalState("count");

  return (
    <Button
      title="ABC"
      onPress={() => {
        callback();
      }}
    />
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <TopComponent />
      <BottomComponent />
      <StatusBar style="auto" />
    </View>
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
