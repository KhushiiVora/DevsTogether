import styled from "styled-components";

const StyledSection = styled.section`
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    background-position: left;
    background-size: cover;
    background-repeat: no-repeat;

    &[data-theme="light"] {
      background-image: linear-gradient(
          to bottom right,
          rgba(0, 0, 0, 0.45),
          rgba(0, 0, 0, 0.45)
        ),
        url("/homeBgLight.png");
    }
    &[data-theme="dark"] {
      background-image: linear-gradient(
          to bottom right,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ),
        url("/homeBgDark.png");
    }
  }

  .container-header {
    width: 90%;
    height: 7%;
    padding: 0.3rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(10px);
    background-color: ${(props) => props.theme.glassmorphism.background};
    border-radius: 0.7rem;
    border: 1px solid ${(props) => props.theme.secondary};
    box-shadow: 0 3px 15px ${(props) => props.theme.glassmorphism.boxShadow};

    div {
      display: flex;
      align-items: center;
    }

    a {
      margin-right: 1rem;
      text-decoration: none;
      color: ${(props) => props.theme.secondaryText};
      transition: all 0.5s ease;
      font-weight: 500;
    }
    a:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  .container-header__icon {
    width: 1.7rem;
    height: 1.7rem;
    margin-right: 0.4rem;
  }
  .container-header__title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .container-header__title--devs,
  .devs {
    color: ${(props) => props.theme.primary};
  }
  .container-header__title--together,
  .together {
    color: ${(props) => props.theme.tertiary};
  }

  .container-body {
    height: 93%;
    display: flex;
    align-items: center;
  }
  .container-body__main {
    width: 50%;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem 0;
    padding: 1rem;
    backdrop-filter: blur(6px);
    background-color: ${(props) => props.theme.glassmorphism.background};
    box-shadow: 0 1px 20px 7px ${(props) => props.theme.glassmorphism.boxShadow},
      1px 0px 20px 7px ${(props) => props.theme.glassmorphism.boxShadow};
    border: 1px solid ${(props) => props.theme.glassmorphism.border};
    border-radius: 0.7rem;
    color: ${(props) => props.theme.text};

    h1 {
      color: ${(props) => props.theme.secondaryText};
    }
    .p.devs,
    .p.together {
      font-weight: 500;
    }
    button {
      width: 25%;
      margin: 0.8rem 0;
    }
  }
`;

export { StyledSection };
