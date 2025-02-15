import { useState } from "react";
import ToggleButton from "../components/atoms/ToggleButton";
import { StyledFilledButton } from "../styles/button.styles";

import { StyledSection } from "../styles/landing.styles";

import icon from "/icon.png";
import logo from "/logo.jpg";

function Landing() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <StyledSection>
      <div className="landing__nav">
        <div className="landing__nav-heading">
          <img src={icon} className="landing__nav-heading__icon" />
          <span className="landing__nav-heading__title landing__nav-heading__title--devs">
            Devs
          </span>
          <span className="landing__nav-heading__title landing__nav-heading__title--together">
            Together
          </span>
        </div>
        <div className="landing__nav-controls">
          <ToggleButton />
          avatar
        </div>
      </div>
      <div className="landing__body">
        <div className="landing__body-main">
          <h1 className="landing__body-main__heading">
            Code Together, Anytime, Anywhere.
          </h1>
          {/* Write, edit, and collaborate in real-time. */}
          <div className="landing__body-main__subline">
            One room, multiple minds — collaborate and code seamlessly with
            DevsTogether.
          </div>
          <div className="landing__body-main__controls">
            <input
              placeholder="Enter a code to join"
              value={inputValue}
              onChange={handleChange}
              required
            />
            <StyledFilledButton>New Room</StyledFilledButton>
            <StyledFilledButton data-button-type="join">
              Join
            </StyledFilledButton>
          </div>
        </div>
        <div className="landing__body-preview">
          <img src={logo}></img>
        </div>
      </div>
    </StyledSection>
  );
}

export default Landing;
