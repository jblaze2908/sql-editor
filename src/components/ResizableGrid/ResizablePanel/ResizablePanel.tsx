import * as React from "react";

import styles from "./ResizablePanel.module.scss";

import type { ResizablePanelProps } from "./ResizablePanel.types";

export default function ResizablePanel({
  children,
  style,
  newHeight,
  rerenderOnHeightChange = false,
}: ResizablePanelProps) {
  const childrenWithProps = rerenderOnHeightChange
    ? React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          newHeight,
        }),
      )
    : children;
  return (
    <div className={styles.container} style={style}>
      {childrenWithProps}
    </div>
  );
}
