import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast, Slide, ToastContainer } from "react-toastify";

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

  const navigate = useNavigate();

  useEffect(() => {
    setShowPasswordSuggestion(!isPasswordStrong());
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
    console.log("in logInWithGoogle");
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  }

  function isPasswordStrong() {
    const password = formData.password.trim();
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return password.length ? regex.test(password) : true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isPasswordStrong()) return;
    try {
      const response = await axios.post("/auth/login", formData);
      const user = response.data;
      console.log("in login", user);
      navigate("/landing");
    } catch (error) {
      toast.error(error.response.data, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
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
