import React from "react";
import { View, StyleSheet } from "react-native";
import ImageFlatList from "./Components/ImageFlatList";

const App = () => {
  return (
    <View style={styles.container}>
      <ImageFlatList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default App;
