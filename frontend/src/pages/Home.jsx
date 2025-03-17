import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ToggleButton from "../components/atoms/ToggleButton";
import Carousal from "../components/home/Carousal";

import { StyledSection } from "../styles/home.styles";
import { StyledFilledButton } from "../styles/button.styles";
import icon from "/icon.png";

function Home() {
  const { isDark } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/landing");
  };
  return (
    <StyledSection>
      <div className="container" data-theme={isDark ? "dark" : "light"}>
        <div className="container-header">
          <div>
            <img src={icon} className="container-header__icon" />
            <span className="container-header__title container-header__title--devs">
              Devs
            </span>
            <span className="container-header__title container-header__title--together">
              Together
            </span>
          </div>
          <div>
            <ToggleButton />
            <a href="/signup">Signup</a>
            <a href="/login">Login</a>
          </div>
        </div>
        <div className="container-body">
          <div className="container-body__main">
            <h1>
              Collaboration thrives when{" "}
              <span className="devs">developers</span>{" "}
              <span className="together">unite!</span>
            </h1>
            <p>
              Jump in and start coding with <span className="p devs">Devs</span>
              <span className="p together">Together</span>—share your ideas
              instantly and collaborate seamlessly like never before!
            </p>
            <StyledFilledButton onClick={handleClick}>
              Let's Code
            </StyledFilledButton>
          </div>
          <Carousal />
        </div>
      </div>
    </StyledSection>
  );
}

export default Home;
