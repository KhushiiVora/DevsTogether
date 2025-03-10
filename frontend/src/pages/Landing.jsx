import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useSocket } from "../hooks/useSocket";
import { connectedUsersSaved } from "../state/socketSlice";

import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../utils/toast";
import ToggleButton from "../components/atoms/ToggleButton";
import Avatar from "@mui/material/Avatar";
import { stringToColor } from "../styles/codeEditor.styles";
import {
  StyledFilledButton,
  StyledOutlinedButton,
} from "../styles/button.styles";
import { StyledSection } from "../styles/landing.styles";

import icon from "/icon.png";
import logo from "/logo.jpg";
import Menu from "../components/landing/Menu";

function Landing() {
  const { user } = useSelector((state) => state.user);
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { createNewSocket } = useSocket();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSocketError = (error) => {
    showErrorToast("Failed to join room!");
    navigate("/landing");
  };

  const handleJoinRoom = (event) => {
    if (!inputValue) return;
    const socket = createNewSocket();
    console.log(socket);

    socket.on("connect_error", handleSocketError);
    socket.on("connect_failed", handleSocketError);

    socket.emit("join", {
      roomCode: inputValue,
      user,
    });
    socket.on("newuser", ({ users }) => {
      console.log("newuser event");
      console.log(users);
      dispatch(connectedUsersSaved(users));
    });
    navigate(`/editor/${inputValue}`);
  };
  const generateCode = (event) => {
    const code = uuidv4();
    setInputValue(code);
  };

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <StyledSection onClick={() => setIsMenuOpen(false)}>
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
          {user.picture ? (
            <Avatar
              className="landing__avatar"
              alt={user.name}
              src={user.picture}
              onClick={handleMenuOpen}
            />
          ) : (
            <Avatar
              className="landing__avatar"
              alt={user.name}
              sx={{ bgcolor: stringToColor(user.name) }}
              onClick={handleMenuOpen}
            >{`${user.name.split(" ")[0][0]}`}</Avatar>
          )}
          {isMenuOpen && <Menu />}
        </div>
      </div>
      <div className="landing__body">
        <div className="landing__body-main">
          <h1 className="landing__body-main__heading">
            Code Together, Anytime, Anywhere.
            {/* Write, edit, and collaborate in real-time. */}
          </h1>
          <div className="landing__body-main__subline">
            One room, multiple minds — collaborate and code seamlessly with
            DevsTogether.
          </div>
          <div className="landing__body-main__controls">
            <StyledOutlinedButton onClick={generateCode}>
              Get Code
            </StyledOutlinedButton>
            <input
              placeholder="Enter a code to join"
              value={inputValue}
              onChange={handleChange}
              required
            />
            <StyledFilledButton onClick={handleJoinRoom}>
              Join
            </StyledFilledButton>
          </div>
        </div>
        <div className="landing__body-preview">
          <img src={logo}></img>
        </div>
      </div>
      <ToastContainer />
    </StyledSection>
  );
}

export default Landing;
