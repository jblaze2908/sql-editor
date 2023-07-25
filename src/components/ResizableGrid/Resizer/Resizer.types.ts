export interface ResizerProps {
  direction: "X" | "Y";
  onResize: (deltaX: number) => void;
}
