import { Tooltip } from "react-tooltip";

export default function ToolTipProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Tooltip id="tooltip" />
    </>
  );
}
