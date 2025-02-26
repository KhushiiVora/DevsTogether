import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${(props) => props.theme.background};

  .code-editor__editor,
  .code-editor__output {
    width: 50%;
    height: 100%;
  }
  .code-editor__editor {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  .code-editor__language_selector {
    height: 100%;
    border-radius: 0.7rem;
    color: ${(props) => props.theme.textOnBg};
    background-color: ${(props) => props.theme.primary};
  }
  .code-editor__editor button {
    padding: 0.5rem;
    margin: 0.5rem;
    font-size: 1rem;
    font-weight: normal;
  }
  .code-editor__output {
    color: ${(props) => props.theme.text};
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem 0;
  }
  .code-editor__output-header {
    display: flex;
    align-items: center;
  }
  .code-editor__output-header h2 {
    flex-grow: 2;
  }
  .code-editor__output-header__avatars {
    cursor: pointer;
  }
  .code-editor__output-header__avatars
    .code-editor__output-header__avatars-avatar {
    width: 1.8rem;
    height: 1.8rem;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
  }
  .code-editor__output-header-menuIcon {
    color: ${(props) => props.theme.text};
  }

  .code-editor__output-console {
    height: 100%;
    margin-top: 0.3rem;
    padding: 0.4rem;
    color: ${(props) => props.theme.secondaryText};
    border: 1px solid ${(props) => props.theme.secondary};
    border-radius: 0.7rem;
    white-space: pre-wrap;
  }

  .code-editor__output-console--error {
    border: 1px solid #ff5555;
    color: #ff5555;
  }
  .code-editor__output-console--loading {
    color: ${(props) => props.theme.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;

const StyledMenu = styled(Menu)`
  & .MuiPaper-root {
    background-color: ${(props) => props.theme.background};
    border: 1px solid ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.text};
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: ${(props) =>
      props.theme.glassmorphism.background} !important;
  }
`;

const StyledBox = styled(Box)`
  width: 17rem;
  height: 100%;
  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.background};
  overflow-y: auto;

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.secondary};
  }

  .code-editor__user {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 1.1rem;
    padding: 0.5rem;
  }

  .code-editor__user-avatar {
    width: 1.8rem;
    height: 1.8rem;
    font-size: 1rem;
    border: 1px solid ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
  }
`;

function stringToColor(string) {
  let hash = 1;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export { StyledSection, stringToColor, StyledMenu, StyledMenuItem, StyledBox };
