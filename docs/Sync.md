# Sync Canvases

If you want to sync two or more canvases together, you can wrap them inside `SketchCanvasProvider`. This is will automatically sync then together.

### Example

```tsx
import {
  SketchCanvas,
  SketchCanvasProvider,
  SketchCanvasRef,
} from 'rn-skia-sketch-canvas';

const SyncedDemo = () => {
  return (
    <SketchCanvasProvider>
      <SketchCanvas
        containerStyle={styles.canvas}
        strokeColor={color}
        strokeWidth={width}
        ref={ref}
      />
      <SketchCanvas
        containerStyle={styles.canvas}
        strokeColor={color}
        strokeWidth={width}
      />
    </SketchCanvasProvider>
  );
};
```

If you don't want to sync one canvas but still is wrapped inside the Provider, you can pass `isSynced={false}` to not sync that canvas with other ones.

```tsx
import {
  SketchCanvas,
  SketchCanvasProvider,
  SketchCanvasRef,
} from 'rn-skia-sketch-canvas';

const SyncedDemo = () => {
  return (
    <SketchCanvasProvider>
      <SketchCanvas
        containerStyle={styles.canvas}
        strokeColor={color}
        strokeWidth={width}
        ref={ref}
      />

      <SketchCanvas
        containerStyle={styles.canvas}
        strokeColor={color}
        strokeWidth={width}
        isSynced={false} // This is not synced with other ones
      />
      <SketchCanvas
        containerStyle={styles.canvas}
        strokeColor={color}
        strokeWidth={width}
      />
    </SketchCanvasProvider>
  );
};
```
