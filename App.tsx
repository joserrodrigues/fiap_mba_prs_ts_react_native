import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textInfo}>Hello World</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textInfo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "red",
  },
});
