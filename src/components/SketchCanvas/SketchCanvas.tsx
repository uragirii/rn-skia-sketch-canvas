import {
  Canvas,
  Path,
  Skia,
  useCanvasRef,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useSketchPaths } from '../hooks';
import { STROKE_COLOR, STROKE_STYLE, STROKE_WIDTH } from './constants';
import { SketchCanvasProps, SketchCanvasRef, ImageFormat } from './types';

const SketchCanvas = forwardRef<SketchCanvasRef, SketchCanvasProps>(
  (
    {
      strokeWidth = STROKE_WIDTH,
      strokeColor = STROKE_COLOR,
      strokeStyle = STROKE_STYLE,
      containerStyle,
      children,
      topChildren,
      isSynced = true,
      onPathsLengthChange,
    },
    frwdRef
  ) => {
    const canvasRef = useCanvasRef();
    const [setPathsLength, paths, forceUpdate] = useSketchPaths(isSynced);

    useImperativeHandle(frwdRef, () => ({
      undo: () => {
        onPathsLengthChange?.(paths.current.length - 1);
        paths.current.pop();
        setPathsLength((prevPathLength) => prevPathLength - 1);
      },
      clear: () => {
        paths.current.length = 0;
        setPathsLength(0);
        onPathsLengthChange?.(0);
      },
      addPath: (path) => {
        paths.current.push(path);
        setPathsLength((prevPathLength) => prevPathLength + 1);
      },
      deletePath: (id) => {
        paths.current = paths.current.filter((path) => path.id !== id);
        setPathsLength(paths.current.length);
      },
      getPaths: () => {
        return paths.current
          .slice()
          .map((path) => ({ ...path, path: path.path.copy() }));
      },
      exportToBase64: (fmt, quality) => {
        const image = canvasRef.current?.makeImageSnapshot();
        if (image) {
          return image.encodeToBase64(fmt ?? ImageFormat.PNG, quality ?? 100);
        }
        return undefined;
      },
      exportToImage: () => {
        return canvasRef.current?.makeImageSnapshot();
      },
    }));

    useEffect(() => {
      onPathsLengthChange?.(paths.current.length);
    }, [paths, onPathsLengthChange]);

    const touchHandler = useTouchHandler({
      onStart: ({ x, y }) => {
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        paths.current.push({
          id: new Date().getTime(),
          path: newPath,
          width: strokeWidth,
          color: strokeColor,
          style: strokeStyle,
        });
        setPathsLength((prevLength) => prevLength + 1);
      },
      onActive: ({ x, y }) => {
        paths.current.at(-1)?.path.lineTo(x, y);
      },
      onEnd: () => {
        onPathsLengthChange?.(paths.current.length);
        forceUpdate();
      },
    });

    return (
      <Canvas style={containerStyle} ref={canvasRef} onTouch={touchHandler}>
        {children}
        {paths.current.map(({ path, id, color, width, style }) => (
          <Path
            path={path}
            key={id}
            strokeWidth={width}
            color={color}
            style={style}
          />
        ))}
        {topChildren}
      </Canvas>
    );
  }
);

export default SketchCanvas;
