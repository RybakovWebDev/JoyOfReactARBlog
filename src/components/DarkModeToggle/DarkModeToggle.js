"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";

import styles from "./DarkModeToggle.module.css";

import { LIGHT_COLORS, DARK_COLORS } from "@/constants";

function DarkModeToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const handleDarkMode = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);

    Cookie.set("color-theme", nextTheme, {
      expires: 1000,
    });

    const root = document.documentElement;
    const colors = nextTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute("data-color-theme", nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };
  return (
    <button className={styles.action} onClick={handleDarkMode}>
      {theme === "light" ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
    </button>
  );
}

export default DarkModeToggle;
