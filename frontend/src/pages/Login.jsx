import { useState } from "react";
import axios from "../axiosConfig";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  StyledSection,
  StyledTextField,
  StyledFormControl,
} from "../styles/auth.styles";
import icon from "/icon.png";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  async function logInWithGoogle() {
    console.log("in logInWithGoogle");
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  }

  return (
    <StyledSection>
      <div className="auth_container">
        <div className="auth_container__header">
          <img className="icon" src={icon} />
          <h1>DEVSTOGETHER</h1>
        </div>
        <div className="auth_container__oauth">
          <button>
            <FcGoogle />
            Continue with Google
          </button>
          <div className="auth_container__separator">
            <div></div>
            <span>or</span>
            <div></div>
          </div>
        </div>

        <form className="auth_container__form">
          <StyledTextField
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
          />
          <StyledFormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </StyledFormControl>
          <button className="submit_button" type="submit">
            Login
          </button>
        </form>
        <span>
          New account? <a href="/signup">Sign up here</a>
        </span>
      </div>
    </StyledSection>
  );
}

export default Login;
