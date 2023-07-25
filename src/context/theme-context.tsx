import { createContext } from "react";

import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { getSystemPreferredColorScheme } from "@/utils/helperFunc";

type Theme = "light" | "dark";
interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext({
  theme: "" as Theme,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { storedValue: theme, setValueBasedOnPreviousValue: setTheme } =
    useLocalStorage<Theme>("theme", getSystemPreferredColorScheme());
  const toggleTheme = () =>
    setTheme((prevTheme: Theme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div data-theme={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
