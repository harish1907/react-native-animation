import React, { useMemo } from "react";
import { View, Text, MotiView, MotiTranformProps } from "moti";
import { Pressable } from "react-native";
import { Easing } from "react-native-reanimated";

const _colors = {
  active: "red",
  inActice: "green",
};

const transition: any = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const CustomSwitch = ({ size, onPress, isActive }: any) => {
  const trackWidth = useMemo(() => {
    return size * 1.5;
  }, [size]);
  const trackHeight = useMemo(() => {
    return size * 0.4;
  }, [size]);
  const knobSize = useMemo(() => {
    return size * 0.6;
  }, [size]);

  return (
    <Pressable
      onPress={onPress}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <MotiView
        transition={transition}
        from={{
          backgroundColor: isActive ? _colors.active : _colors.inActice,
        }}
        animate={{
          backgroundColor: isActive ? _colors.inActice : _colors.active,
        }}
        style={{
          position: "absolute",
          width: trackWidth,
          height: trackHeight,
          borderRadius: trackHeight / 2,
          backgroundColor: _colors.active,
        }}
      />

      <MotiView
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#FFF",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{
          translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
        }}
      >
        <MotiView
          animate={{
            width: isActive ? 0 : knobSize,
            borderColor: isActive ? _colors.inActice : _colors.active,
          }}
          style={{
            width: knobSize,
            height: knobSize,
            borderRadius: knobSize / 2,
            borderWidth: size * 0.1,
            borderColor: _colors.active,
          }}
        />
      </MotiView>
    </Pressable>
  );
};

export default CustomSwitch;
