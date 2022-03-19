# Draw on Image

You can easily pass `children` and render anything on top of the canvas. If you want image, you can import `Image` from `react-native-skia`

## Example

```tsx
import { SketchCanvas } from 'rn-skia-sketch-canvas';

const ImageDemo = () => {
  const image = useImage('https://bit.ly/3fkulX5');

  return (
    <SketchCanvas
      containerStyle={styles.canvas}
      strokeColor={color}
      strokeWidth={width}
      ref={ref}
    >
      {image && (
        <Image
          image={image}
          fit="contain"
          x={0}
          y={0}
          width={256}
          height={256}
        />
      )}
    </SketchCanvas>
  );
};
```

Learn more about Skia images [here](https://shopify.github.io/react-native-skia/docs/images)

If you want to render contents on top of the Path, you can pass them to the prop `topChildren`

```tsx
import { SketchCanvas } from 'rn-skia-sketch-canvas';

const ImageDemo = () => {
  const image = useImage('https://bit.ly/3fkulX5');

  return (
    <SketchCanvas
      containerStyle={styles.canvas}
      strokeColor={color}
      strokeWidth={width}
      ref={ref}
      topChilden ={image && (
        <Image
          image={image}
          fit="contain"
          x={0}
          y={0}
          width={256}
          height={256}
        />
      )}
    >
  );
};
```
