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

export { StyledSection };
