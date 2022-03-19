import { createContext, FC, useContext, useRef, useState } from 'react';
import type { SketchPath } from '../SketchCanvas/types';
import React from 'react';

type SketchCanvasContextData = [
  React.Dispatch<React.SetStateAction<number>>,
  React.MutableRefObject<SketchPath[]>,
  () => void
];

export const SketchCanvasContext =
  createContext<SketchCanvasContextData | null>(null);

export const useSketchCanvasContext = () => {
  return useContext(SketchCanvasContext);
};

const SketchCanvasProvider: FC = ({ children }) => {
  const [, setPathsLength] = useState(0);
  const paths = useRef<SketchPath[]>([]);
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <SketchCanvasContext.Provider value={[setPathsLength, paths, forceUpdate]}>
      {children}
    </SketchCanvasContext.Provider>
  );
};

export default SketchCanvasProvider;
