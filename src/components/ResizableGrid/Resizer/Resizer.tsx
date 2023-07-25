import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import styles from "./Resizer.module.scss";

import type { ResizerProps } from "./Resizer.types";

export default function Resizer({ direction, onResize }: ResizerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = () => {
    setIsDragging(true);
    document.documentElement.style.userSelect = "none";
    document.documentElement.style.cursor =
      direction === "X" ? "col-resize" : "row-resize";
  };

  const onDragEnd = useCallback(() => {
    document.documentElement.style.userSelect = "auto";
    document.documentElement.style.cursor = "default";
    setIsDragging(false);
  }, [setIsDragging]);

  const onDrag = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;
      const delta = direction === "Y" ? event.movementY : event.movementX;
      onResize(delta);
    },
    [isDragging, direction, onResize]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", onDragEnd);
    } else {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", onDragEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", onDragEnd);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return (
    <div
      onMouseDown={onDragStart}
      draggable={false}
      className={clsx(
        styles.container,
        isDragging && styles.containerActive,
        direction === "Y" && styles.horizontal,
        direction === "X" && styles.vertical
      )}
    />
  );
}
