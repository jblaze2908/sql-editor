import ThemeProvider from "./ThemeProvider";
import SqlWorkspaceProvider from "./SqlWorkspaceProvider";
import ToastMessageProvider from "./ToastMessageProvider";
import ToolTipProvider from "./ToolTipProvider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <ToastMessageProvider>
        <ToolTipProvider>
          <SqlWorkspaceProvider>{children}</SqlWorkspaceProvider>
        </ToolTipProvider>
      </ToastMessageProvider>
    </ThemeProvider>
  );
}
