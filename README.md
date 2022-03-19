# rn-skia-sketch-canvas

![main](https://user-images.githubusercontent.com/19703138/159124156-f9d33301-0b49-4644-9cf6-cd80df8a8467.gif)
![sync](https://user-images.githubusercontent.com/19703138/159124161-27b379dd-a368-4a7b-9d34-aeebb0e254b5.gif)

A React Native component for drawing using Skia renderer. This project is highly influnced by terrylinla's [`react-native-sketch-canvas`](https://github.com/terrylinla/react-native-sketch-canvas). A simple canvas that allows you to draw paths and then export them to images. This project is build on top of `react-native-skia`.

## Installation

As this project depends on `react-native-skia` make sure you install that. Follow [their instructions](https://shopify.github.io/react-native-skia/docs/getting-started/installation) (Supports RN>=0.66)

```sh
yarn add rn-skia-sketch-canvas
```

## Features

- Supports both iOS and Android.
- Stroke thickness and color are changable while drawing.
- Can undo strokes one by one.
- Export drawing to image (jpg/png/webp).
- Support for drawing on top of Images/Text (See [Docs](./docs/ImageDraw.md))
- Sync 2 or more canvases together (See [Docs](./docs/Sync.md))

## Usage

```tsx
import { ImageFormat } from '@shopify/react-native-skia';
import React, { useRef, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { SketchCanvas, SketchCanvasRef } from 'rn-skia-sketch-canvas';

const COLORS = ['red', 'blue', 'green', 'magenta', 'yellow'];

const App = () => {
  const ref = useRef<SketchCanvasRef>(null!);
  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SketchCanvas
          containerStyle={styles.container}
          ref={ref}
          strokeColor={color}
          strokeWidth={strokeWidth}
        />
        <View style={styles.btnContainer}>
          <Button title="Undo" onPress={ref.current?.undo} />
          <Button title="Clear" onPress={ref.current?.clear} />
          <Button
            title={`Color (${color})`}
            onPress={() => {
              const randomIndex = Math.floor(Math.random() * COLORS.length);
              setColor(COLORS[randomIndex]);
            }}
          />
          <Button
            title={`Stroke (${strokeWidth})`}
            onPress={() => {
              const randomIndex = Math.floor(Math.random() * COLORS.length);
              setStrokeWidth(randomIndex);
            }}
          />
          <Button
            title="Base 64"
            onPress={() => {
              console.log(ref.current.exportToBase64(ImageFormat.PNG, 50));
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
});

export default App;
```

## Todo

- [ ] Allow export to SVG for paths.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
