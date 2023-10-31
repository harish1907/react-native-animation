import React from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { StyleSheet, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SIZE = 100;
const CIRCLE_RADIUS = width * 0.48;

const GestureHandleComp = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (event, context: any) => {
        context.translateX = translateX.value;
        context.translateY = translateY.value;
      },
      onActive: (event, context: any) => {
        translateX.value = event.translationX + context.translateX;
        translateY.value = event.translationY + context.translateY;
      },
      onEnd: () => {
        const distance = Math.sqrt(translateX.value * 2 + translateY.value * 2);
        if (distance < CIRCLE_RADIUS) {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      },
    });

  const atStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.circle}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[atStyle, styles.box]} />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "blue",
    borderRadius: 20,
  },
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GestureHandleComp;
