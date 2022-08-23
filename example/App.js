import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SubComponent from './SubComponent';
import { useGlobalCallback } from 'hook-global-state'

export default function App() {
  const callback = useGlobalCallback('callback', () => {
    alert('ABC');
  })

  return (
    <View style={styles.container}>
      <SubComponent />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
