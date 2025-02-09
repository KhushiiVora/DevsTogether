import { useState } from "react";
import { light, dark } from "../styles/theme";

function useTheme() {
  const [isDark, setIsDark] = useState(true);

  function toggleTheme() {
    setIsDark(!isDark);
  }
  return { theme: isDark ? dark : light, toggleTheme };
}

export default useTheme;
