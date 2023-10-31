import React, { useCallback, useRef } from "react";
import { Dimensions, StyleSheet, Image, ImageBackground } from "react-native";
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const AnimatedImage = Animated.createAnimatedComponent(Image);

const InstaLike = () => {
  const doubleTabRef = useRef();
  const scale = useSharedValue(0);

  const arStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: Math.max(scale.value, 0) }],
    };
  });

  const doubleTabHandler = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTabRef}
        onActivated={() => {
          console.log("SINGLE TAB");
        }}
      >
        <TapGestureHandler
          ref={doubleTabRef}
          onActivated={doubleTabHandler}
          numberOfTaps={2}
          maxDelayMs={250}
        >
          <Animated.View>
            <ImageBackground
              source={require("../assets/bcg.jpeg")}
              style={styles.bcgImage}
            >
              <AnimatedImage
                source={require("../assets/like.png")}
                style={[styles.image, arStyle]}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bcgImage: {
    flex: 1,
    resizeMode: "center",
    height,
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: width / 2,
    width: width / 2,
    tintColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    resizeMode: "center",
  },
});

export default InstaLike;
