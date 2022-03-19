import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { SketchCanvas } from 'rn-skia-sketch-canvas';

export default function App() {
  return (
    <View style={styles.container}>
      <SketchCanvas containerStyle={styles.canvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
});
