import { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { pexelsImages } from "./DummyApiData";
import { MotiImage } from "moti";
import { Easing } from "react-native-reanimated";

const { height, width } = Dimensions.get("screen");
const IMAGE_SIZE = width * 0.2 - 15;
const SPACING = 10;

const App = () => {
  const topRef: any = useRef();
  const thumbRef: any = useRef();

  const [images, setImages]: any = useState(pexelsImages.photos);
  const [activeIndex, setActiveIndex]: any = useState(0);

  const scrollToActiveIndex = (index: any) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width)
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ height, width }}>
              <Image
                source={{ uri: item.src.portrait }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={thumbRef}
        data={images}
        style={{ position: "absolute", bottom: IMAGE_SIZE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{ paddingTop: 50 }}
              onPress={() => scrollToActiveIndex(index)}
            >
              <MotiImage
                animate={{
                  translateY: activeIndex === index ? -10 : 0,
                  scale: activeIndex === index ? 1.15 : 1,
                }}
                transition={{
                  type: "timing",
                  duration: 300,
                  easing: Easing.inOut(Easing.ease),
                }}
                source={{ uri: item.src.portrait }}
                style={{
                  height: IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  borderRadius: 12,
                  marginLeft: SPACING,
                  borderWidth: 2,
                  borderColor: activeIndex === index ? "#FFF" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});

export default App;
