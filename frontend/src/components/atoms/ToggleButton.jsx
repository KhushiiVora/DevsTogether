import useTheme from "../../hooks/useTheme";
import { StyledToggleDiv } from "../../styles/button.styles";

function ToggleButton() {
  const { toggleTheme, isDark } = useTheme();
  return (
    // if error add outer div
    <StyledToggleDiv>
      <div
        data-theme={isDark ? "dark" : "light"}
        onClick={toggleTheme}
        className="mode_switch"
      >
        <div className="mode_switch--slider">
          <div></div>
        </div>
      </div>
    </StyledToggleDiv>
  );
}

export default ToggleButton;
