import type {
  Color as SkColor,
  SkPath,
  SkImage as SImage,
} from '@shopify/react-native-skia';
import type { StyleProp, ViewStyle } from 'react-native';

export interface SketchPath {
  id: number;
  path: SkPath;
  width: number;
  color: Color;
  style: StrokeStyle;
}

export enum ImageFormat {
  PNG,
  JPEG,
  WEBP,
}

export type Image = SImage;
export type Color = SkColor;

export interface SketchCanvasRef {
  undo: () => void;
  clear: () => void;
  addPath: (path: SketchPath) => void;
  deletePath: (id: SketchPath['id']) => void;
  getPaths: () => SketchPath[];
  exportToBase64: (fmt?: ImageFormat, quality?: number) => string | undefined;
  exportToImage: () => Image | undefined;
}

export interface SketchCanvasProps {
  strokeWidth?: number;
  strokeColor?: Color;
  strokeStyle?: StrokeStyle;
  containerStyle?: StyleProp<ViewStyle>;
}

export type StrokeStyle = 'stroke' | 'fill';
