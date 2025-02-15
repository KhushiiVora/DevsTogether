import styled from "styled-components";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.background};

  .landing__nav {
    height: 7%;
    padding: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .landing__nav-heading,
  .landing__nav-controls {
    display: flex;
    align-items: center;
  }
  .landing__nav-heading__icon {
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 0.4rem;
  }
  .landing__nav-heading__title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .landing__nav-heading__title--devs {
    color: ${(props) => props.theme.primary};
  }
  .landing__nav-heading__title--together {
    color: ${(props) => props.theme.tertiary};
  }
  .landing__body {
    width: 100%;
    height: 100%;
    display: flex;
    color: ${(props) => props.theme.text};
  }
  .landing__body-main,
  .landing__body-preview {
    width: 50%;
    display: flex;
    /* align-items: center; */
  }

  .landing__body-main {
    flex-direction: column;
    justify-content: center;
    padding: 0 2.5rem;
    font-size: 1.3rem;
  }

  .landing__body-main__heading {
    color: ${(props) => props.theme.tertiary};
  }

  .landing__body-main__subline {
    width: 80%;
    color: ${(props) => props.theme.secondaryText};
  }

  .landing__body-main__controls {
    width: 85%;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .landing__body-main__controls button {
    flex-grow: 1;
    font-size: 1rem;
  }

  .landing__body-main__controls input {
    color: ${(props) => props.theme.text};
    padding: 0.7rem;
    flex-grow: 2;
    background-color: ${(props) => props.theme.background};
    border: 1px solid ${(props) => props.theme.text};
    outline: none;
    border-radius: 0.7rem;
  }

  .landing__body-preview {
    justify-content: center;
  }

  .landing__body-preview img {
    width: 30%;
    align-self: center;
  }
`;

export { StyledSection };
