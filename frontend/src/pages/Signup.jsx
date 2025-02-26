import { useEffect, useState } from "react";
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

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isPasswordStrong(formData.password)) return;
    try {
      const response = await axios.post("/auth/signup", formData);
      const user = response.data;
      console.log("in signup", user);
      dispatch(userSaved(user));
      navigate("/landing");
    } catch (error) {
      console.log("signup error", error);
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
        <form className="auth_container__form" onSubmit={handleSubmit}>
          <StyledTextField
            id="standard-basic"
            label="Name"
            name="name"
            variant="standard"
            type="text"
            autoComplete="none"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <StyledTextField
            id="standard-basic"
            label="Email"
            name="email"
            variant="standard"
            type="email"
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
              type={showPassword ? "text" : "password"}
              name="password"
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
            Sign Up
          </button>
        </form>
        <span>
          Already have an account? <a href="/login">Login here</a>
        </span>
      </div>
      <ToastContainer />
    </StyledSection>
  );
}

export default Signup;
