import { View, StyleSheet } from "react-native";
import ButtonBounce from "./Components/ButtonBounce";

const App = () => {
  return (
    <View style={styles.container}>
      <ButtonBounce />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
});

export default App;
