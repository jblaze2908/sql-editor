import { useContext } from "react";

import { ThemeContext } from "@/context/theme-context";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={styles.container}>
      <div className={styles.emptySpace} />
      <h1 className={styles.title}>Online SQL</h1>
      <button className={styles.themeButton} onClick={toggleTheme}>
        <img src={theme === "light" ? "moon.svg" : "sun.svg"} alt="" />
      </button>
    </nav>
  );
}
