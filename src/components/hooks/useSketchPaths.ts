import { useRef, useState } from 'react';
import type { SketchPath } from '../SketchCanvas';
import { useSketchCanvasContext } from '../SketchCanvasProvider/SketchCanvasProvider';

export const useSketchPaths = (isSynced: boolean) => {
  const context = useSketchCanvasContext();
  const [, setPathsLength] = useState(0);
  const paths = useRef<SketchPath[]>([]);

  if (context && isSynced) {
    return context;
  }

  return [setPathsLength, paths, () => {}] as const;
};
