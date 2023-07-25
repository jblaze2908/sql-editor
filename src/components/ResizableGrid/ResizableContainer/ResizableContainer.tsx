import * as React from "react";
import clsx from "clsx";

import Resizer from "../Resizer";

import styles from "./ResizableContainer.module.scss";

import type { ResizableContainerProps } from "./ResizableContainer.types";

export default function ResizableContainer({
  direction,
  children,
  initialSizes,
  sizesForCollapse,
}: ResizableContainerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [sizes, setSizes] = React.useState(
    initialSizes ||
      new Array(React.Children.count(children)).fill(
        100 / React.Children.count(children)
      )
  );
  const getContainerSize = () => {
    const containerSize =
      direction === "Y"
        ? containerRef.current?.clientHeight
        : containerRef.current?.clientWidth;
    return containerSize || 0;
  };
  const handleResize = (index: number, delta: number) => {
    if (!containerRef.current) return;
    const containerSize =
      direction === "Y"
        ? containerRef.current.clientHeight
        : containerRef.current.clientWidth;
    const deltaPercentage = (delta / containerSize) * 100;
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] += deltaPercentage;
      newSizes[index + 1] -= deltaPercentage;
      if (sizesForCollapse && sizesForCollapse.length) {
        if (deltaPercentage < 0 && newSizes[index] < sizesForCollapse[index]) {
          newSizes[index + 1] +=
            deltaPercentage + sizesForCollapse[index] - newSizes[index];
          newSizes[index] = 0;
        } else if (
          deltaPercentage > 0 &&
          newSizes[index + 1] < sizesForCollapse[index + 1]
        ) {
          newSizes[index] += sizesForCollapse[index + 1] - newSizes[index + 1];
          newSizes[index + 1] = 0;
        }
      }
      const fixedSizes = newSizes.map((item) =>
        Math.min(Math.max(item, 0), 100)
      );
      return fixedSizes;
    });
  };
  const newChildren = React.Children.toArray(children).flatMap(
    (child, index) => {
      const element = React.cloneElement(child as React.ReactElement, {
        style: { [direction === "X" ? "width" : "height"]: `${sizes[index]}%` },
        newHeight: (sizes[index] * getContainerSize()) / 100,
      });
      if (index !== React.Children.count(children) - 1) {
        return [
          element,
          <Resizer
            direction={direction}
            onResize={(delta) => {
              handleResize(index, delta);
            }}
          />,
        ];
      }
      return [element];
    }
  );
  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.container,
        direction === "X" ? styles.containerX : styles.containerY
      )}
    >
      {newChildren}
    </div>
  );
}
