import styled from "styled-components";

const StyledToggleDiv = styled.div`
  .mode_switch {
    position: relative;
    margin-right: 1rem;
    width: 2.3rem;
    height: 1.3rem;
    background-color: ${(props) => props.theme.primary};
    border-radius: 1rem;
    cursor: pointer;
  }

  .mode_switch--slider {
    position: absolute;
    height: 0.9rem;
    width: 0.9rem;
    margin: 0.2rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.tertiary};
    transition: all 0.4s ease;
  }
  [data-theme="light"] .mode_switch--slider {
    transform: translateX(0);
  }

  [data-theme="dark"] .mode_switch--slider {
    transform: translateX(105%);
    background-color: ${(props) => props.theme.secondary};
  }
  [data-theme="dark"].mode_switch {
    background-color: ${(props) => props.theme.tertiary};
  }
`;

const StyledFilledButton = styled.button`
  padding: 0.6rem;
  margin: 1.2rem 0;
  background: ${(props) => props.theme.primary};
  outline: none;
  color: ${(props) => props.theme.textOnBg};
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 0.7rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled&:hover,
  &:disabled&:active {
    transform: none;
    background-color: inherit;
  }
`;

const StyledOutlinedButton = styled(StyledFilledButton)`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.background};
  border: 2px solid ${(props) => props.theme.primary};

  &:hover {
    background: ${(props) => props.theme.glassmorphism.background};
  }
  &:disabled {
    color: ${(props) => props.theme.secondary};
    border-color: ${(props) => props.theme.secondary};
  }
`;

const StyledIconButton = styled.button`
  /* padding: 0.3rem 0 0 0.2rem; */
  border: none;
  outline: none;
  font-size: 1.8rem;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  border-radius: 0.7rem;
  transition: all 0.2s ease;
  &:hover {
    background: ${(props) => props.theme.glassmorphism.background};
  }
`;

export {
  StyledToggleDiv,
  StyledFilledButton,
  StyledOutlinedButton,
  StyledIconButton,
};
