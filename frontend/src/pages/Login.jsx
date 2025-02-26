import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../axiosConfig";

import { saved as userSaved } from "../state/userSlice";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { ToastContainer } from "react-toastify";
import { showErrorToast } from "../utils/toast";
import { isPasswordStrong } from "../utils/validatePassword";

import {
  StyledSection,
  StyledTextField,
  StyledFormControl,
} from "../styles/auth.styles";
import icon from "/icon.png";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPasswordSuggestion, setShowPasswordSuggestion] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setShowPasswordSuggestion(!isPasswordStrong(formData.password));
  }, [formData.password]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  function handleChange(event) {
    const value = event?.target?.value;

    setFormData({
      ...formData,
      [event?.target?.name]: value,
    });
  }

  async function logInWithGoogle() {
    const authWindow = window.open(
      `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
      "_blank",
      "width=700,height=700"
    );

    const receiveMessage = (event) => {
      if (event.origin !== import.meta.env.VITE_API_BASE_URL) return;

      const data = event.data;
      if (data.status === "success") {
        dispatch(userSaved(JSON.parse(data.user)));
        authWindow?.close();
        window.location.href = `${window.origin}/landing`;
      }

      window.removeEventListener("message", receiveMessage);
    };

    window.addEventListener("message", receiveMessage);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isPasswordStrong(formData.password)) return;
    try {
      const response = await axios.post("/auth/login", formData);
      const user = response.data;
      console.log("in login", user);
      dispatch(userSaved(user));
      navigate("/landing");
    } catch (error) {
      showErrorToast(error.response.data);
    }
  }

  return (
    <StyledSection>
      <div className="auth_container">
        <div className="auth_container__header">
          <img className="icon" src={icon} />
          <h1>DEVSTOGETHER</h1>
        </div>
        <div className="auth_container__oauth">
          <button onClick={logInWithGoogle}>
            <FcGoogle />
            Continue with Google
          </button>
          <div className="auth_container__separator">
            <div></div>
            <span>or</span>
            <div></div>
          </div>
        </div>

        <form className="auth_container__form" onSubmit={handleSubmit}>
          <StyledTextField
            id="standard-basic"
            label="Email"
            variant="standard"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <StyledFormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
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
          <span
            className={`password_suggestion ${
              showPasswordSuggestion ? "show" : ""
            }`}
          >
            Password should contain: atleast 8 characters, 1 lowercase, 1
            uppercase, 1 special character, 1 digit.
          </span>
          <button className="submit_button" type="submit">
            Login
          </button>
        </form>
        <span>
          New account? <a href="/signup">Sign up here</a>
        </span>
      </div>
      <ToastContainer />
    </StyledSection>
  );
}

export default Login;
