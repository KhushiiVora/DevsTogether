import styled from "styled-components";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const StyledSection = styled.section`
  height: 100%;
  width: 100%;
  align-content: center;
  background: ${(props) => props.theme.background};
  /* background: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.background}
  ); */

  .auth_container {
    width: 35%;
    height: 75%;
    margin: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.glassmorphism.background};
    border-radius: 5%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid ${(props) => props.theme.secondary};
    box-shadow: 0 1px 15px ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.primary};
    text-align: center;
  }

  .auth_container__header {
    /* height: 10%; */
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .auth_container__header .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .auth_container__oauth {
    width: 70%;
  }

  .auth_container__separator {
    display: flex;
    align-items: center;
  }

  .auth_container__separator div {
    flex-grow: 1;
    height: 1px;
    border: 1px solid ${(props) => props.theme.secondary};
  }

  .auth_container__separator span {
    margin: 0 1rem;
    color: ${(props) => props.theme.primary};
  }

  .auth_container__form {
    width: 70%;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: ${(props) => props.theme.text};
  }

  .auth_container__form .submit_button,
  .auth_container__oauth button {
    width: 100%;
    margin: 0.7rem 0;
    align-self: center;
    background: none;
    outline: none;
    color: ${(props) => props.theme.primary};
    padding: 0.7rem;
    border: 2px solid ${(props) => props.theme.primary};
    border-radius: 1rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .auth_container__oauth button {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .auth_container__form .submit_button:hover {
    background: ${(props) => props.theme.primary};
    color: white;
    border-color: ${(props) => props.theme.secondary};
    transform: translateY(-1px);
  }

  .auth_container__oauth button:hover {
    background: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.text};
    border-color: ${(props) => props.theme.secondary};
    transform: translateY(-1px);
  }

  .auth_container__form .submit_button:active,
  .auth_container__oauth button:active {
    transform: translateY(1px);
  }

  .password_suggestion {
    visibility: hidden;
    color: #f46666;
    font-size: 0.7rem;
    margin-top: -1rem;
  }

  .password_suggestion.show {
    visibility: visible;
  }

  span,
  a {
    color: ${(props) => props.theme.tertiary};
  }
  a {
    font-style: italic;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiInputBase-input {
    color: ${(props) => props.theme.text};
  }
  & .MuiInput-underline:before {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }

  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }

  & .MuiInput-underline:after {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }
  & .MuiInputLabel-root {
    color: ${(props) => props.theme.primary};
  }
  & .MuiInputLabel-root.Mui-focused {
    color: ${(props) => props.theme.primary};
  }
`;

const StyledFormControl = styled(FormControl)`
  & .MuiInputBase-root {
    color: ${(props) => props.theme.text};
  }

  & .MuiInput-underline:before {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }

  & .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }

  & .MuiInput-underline:after {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }

  & .MuiInputLabel-root {
    color: ${(props) => props.theme.primary};
  }

  & .MuiInputLabel-root.Mui-focused {
    color: ${(props) => props.theme.primary};
  }

  & .MuiIconButton-root {
    color: ${(props) => props.theme.primary};
  }

  & .MuiIconButton-root:hover {
    color: ${(props) => props.theme.primary};
  }
`;

export { StyledSection, StyledTextField, StyledFormControl };
