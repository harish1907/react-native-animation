import { MotiView } from "moti";
import React from "react";

const LoadingIndicator = ({ size, color }: { size: number; color: string }) => {
  return (
    <MotiView
      from={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderWidth: 0,
        shadowOpacity: 0,
      }}
      animate={{
        height: size + 20,
        width: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        borderWidth: size / 10,
        borderColor: color,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 10,
        shadowOpacity: 1,
      }}
    />
  );
};

export default LoadingIndicator;
