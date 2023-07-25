export interface ResizablePanelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  newHeight?: number;
  rerenderOnHeightChange?: boolean;
}
