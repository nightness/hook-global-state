import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useGlobalState } from "hook-global-state";

const TopComponent = () => {
  const [count, setCount] = useGlobalState("count", 0);

  return (
    <>
      <Button title="Add to Count" onPress={() => setCount((c) => c + 1)} />
      <Button
        title="Alert with count"
        onPress={() => alert(`count = ${count}`)}
      />
    </>
  );
};

const BottomComponent = () => {
  const [count, setCount] = useGlobalState("count", 0);

  return (
    <>
      <Button title="Add to Count" onPress={() => setCount((c) => c + 1)} />
      <Button
        title="Alert with count"
        onPress={() => alert(`count = ${count}`)}
      />
    </>
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
