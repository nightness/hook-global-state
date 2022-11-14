import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useGlobalState } from "hook-global-state";

const TopComponent = () => {
  const [count, setCount] = useGlobalState("count", 0);

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "50%" }}
    >
      <Button title="Add to Count" onPress={() => setCount((c) => c + 1)} />
      <Button
        title="Alert with count"
        onPress={() => alert(`count = ${count}`)}
      />
    </View>
  );
};

const BottomComponent = () => {
  const [count, setCount] = useGlobalState("count", 0);

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: "50%" }}
    >
      <Button title="Add to Count" onPress={() => setCount((c) => c + 1)} />
      <Button
        title="Alert with count"
        onPress={() => alert(`count = ${count}`)}
      />
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        Both top and bottom are siblings with a shared global state
      </Text>
      <TopComponent />
      <BottomComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
