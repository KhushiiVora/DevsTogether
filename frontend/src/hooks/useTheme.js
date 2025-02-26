import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../state/themeSlice";
import { light, dark } from "../styles/theme";

function useTheme() {
  const { isDark } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  function toggleTheme() {
    dispatch(toggle());
  }
  return { theme: isDark ? dark : light, toggleTheme, isDark };
}

export { useTheme };
