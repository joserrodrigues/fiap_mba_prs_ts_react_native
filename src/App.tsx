import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const App = () => {
  const [info, setInfo] = useState("Teste Rubens");
  const onPressButton = (info: string) => {
    setInfo(info);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text>{info}</Text>
        <Button
          onPress={() => onPressButton("Teste 2")}
          title="Teste"
          testID="buttonID"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});

export default App;
