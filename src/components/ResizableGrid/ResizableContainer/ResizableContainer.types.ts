export interface ResizableContainerProps {
  direction: "X" | "Y";
  children: React.ReactNode;
  initialSizes: number[];
  sizesForCollapse?: number[];
}
