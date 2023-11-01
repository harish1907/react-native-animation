import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const BOX = width * 0.7;

const Page = ({ title, index, translateX }: any) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, BOX / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, inputRange, [
      height / 2,
      0,
      -height / 2,
    ]);
    const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
      ]}
    >
      <Animated.View style={[rStyle, styles.box]} />
      <Animated.View style={[{ position: "absolute" }, textAnimatedStyle]}>
        <Text style={styles.textStyle}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: BOX,
    height: BOX,
    backgroundColor: "rgba(0,0,256, 0.5)",
  },
  textStyle: {
    color: "#FFF",
    fontSize: 70,
  },
});

export default Page;
