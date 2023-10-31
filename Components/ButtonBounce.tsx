import React from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const CIRCLE = 100;
const ButtonBounce = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {[...Array(3).keys()].map((item: any, index: any) => (
          <MotiView
            from={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              type: "timing",
              duration: 2000,
              easing: Easing.out(Easing.ease),
              loop: true,
              delay: index * 400,
              repeatReverse: false,
            }}
            key={index}
            style={[styles.circle, { position: "absolute" }]}
          />
        ))}
        <Feather name="phone-outgoing" size={33} color={"#FFF"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "#7743DB",
    height: CIRCLE,
    width: CIRCLE,
    borderRadius: CIRCLE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonBounce;
