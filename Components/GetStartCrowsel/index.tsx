import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./Page";

const WORDS = ["What's", "up", "mobile", "dev"];
const GetStartCrowsel = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={[styles.container]}
    >
      {WORDS.map((item, index) => (
        <Page
          key={index.toString()}
          title={item}
          index={index}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default GetStartCrowsel;
