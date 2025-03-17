import styled from "styled-components";

const StyledDiv = styled.div`
  width: 70%;
  height: 100%;
  margin: auto;
  position: relative;
  aspect-ratio: 1 / 1;
  backdrop-filter: blur(1px);

  --rotate-speed: 30;
  --count: 5;
  --easeInOutSine: cubic-bezier(0.37, 0, 0.63, 1);
  --easing: cubic-bezier(0, 0.37, 1, 0.63);

  ul:hover * {
    animation-play-state: paused;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    outline: 2px dotted ${(props) => props.theme.text};
    z-index: 1;
    overflow: hidden;
  }
  li {
    position: absolute;
    top: 47%;
    transform: translateY(-50%);
    width: 100%;
    animation: rotateCW calc(var(--rotate-speed) * 1s) var(--easing) infinite;
  }
  .card {
    width: 35%;
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
    background: ${(props) => props.theme.background};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1),
      0px 16px 32px rgba(0, 0, 0, 0.1);
    border-radius: 0.7rem;
    font-family: "Inter", sans-serif;
    color: ${(props) => props.theme.secondaryText};
    animation: rotateCCW calc(var(--rotate-speed) * 1s) var(--easing) infinite;
  }
  img {
    position: absolute;
    top: -2rem;
    right: 0rem;
    width: 20%;
    object-fit: contain;
  }
  .share {
    width: 30%;
  }
  .collab {
    padding: 0.3rem;
    background-color: ${(props) => props.theme.glassmorphism.border};
    border-radius: 0.7rem;
    width: 35%;
  }
  .idea {
    background-color: ${(props) => props.theme.glassmorphism.border};
    border-radius: 0.7rem;
  }
  .streaming {
    border-radius: 0.7rem;
    top: -2.3rem;
    width: 30%;
  }
  .team {
    width: 30%;
    padding: 0.3rem;
    background-color: ${(props) => props.theme.glassmorphism.background};
    border-radius: 0.7rem;
  }
  .card-content {
    padding: 1rem;
  }
  .card-content__header {
    font-weight: bold;
    font-size: 1.2rem;
    color: ${(props) => props.theme.primary};
    display: block;
  }
  .card-content__paragraph {
    font-size: 0.7rem;
  }

  li:nth-child(2),
  li:nth-child(2) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -1s);
  }
  li:nth-child(3),
  li:nth-child(3) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -2s);
  }
  li:nth-child(4),
  li:nth-child(4) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -3s);
  }
  li:nth-child(5),
  li:nth-child(5) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -4s);
  }
  li:nth-child(6),
  li:nth-child(6) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -5s);
  }
  li:nth-child(7),
  li:nth-child(7) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -6s);
  }
  li:nth-child(8),
  li:nth-child(8) .card {
    animation-delay: calc((var(--rotate-speed) / var(--count)) * -7s);
  }

  @keyframes rotateCW {
    from {
      transform: translate3d(0px, -10%, -1px) rotate(-45deg);
    }
    to {
      transform: translate3d(0px, -10%, 0px) rotate(-315deg);
    }
  }
  @keyframes rotateCCW {
    from {
      transform: rotate(45deg);
    }
    to {
      transform: rotate(315deg);
    }
  }
  @keyframes pulseGlow {
    from {
      background-size: 60%;
    }
    to {
      background-size: 100%;
    }
  }

  .center-circle {
    position: absolute;
    width: 20%;
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: ${(props) => props.theme.primary};
    /* box-shadow: 0px 18px 36px -18px ${(props) => props.theme.secondary},
      0px 30px 60px -12px ${(props) => props.theme.secondary}; */
    box-shadow: 0px 18px 36px -18px rgba(3, 1, 10, 0.38),
      0px 30px 60px -12px rgba(3, 1, 10, 0.38);
  }
  .second-circle {
    position: absolute;
    width: 35%;
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${(props) => props.theme.text};
    opacity: 0.5;
    box-shadow: 0px 18px 36px -18px rgba(3, 1, 10, 0.46),
      0px 30px 60px -12px rgba(3, 1, 13, 0.46);
    border-radius: 50%;
  }
  .last-circle {
    position: absolute;
    width: 50%;
    aspect-ratio: 1 / 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #f5f4fe;
    opacity: 0.25;
    box-shadow: 0px 18px 36px -18px rgba(2, 1, 10, 0.3),
      0px 30px 60px -12px rgba(3, 1, 13, 0.25);
    border-radius: 50%;
  }
  .crop {
    height: 100%;
    mask-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 1) 50%,
      rgba(0, 0, 0, 1)
    );
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50%;
    animation: pulseGlow 5s linear infinite alternate;
    background-position: 100% 50%;
    background-repeat: no-repeat;
    background-image: radial-gradient(
      100% 50% at 100% 50%,
      rgba(60, 184, 201, 0.25) 0%,
      rgba(60, 184, 201, 0.247904) 11.79%,
      rgba(59, 184, 201, 0.241896) 21.38%,
      rgba(58, 184, 201, 0.2324) 29.12%,
      rgba(57, 184, 201, 0.219837) 35.34%,
      rgba(55, 184, 201, 0.20463) 40.37%,
      rgba(53, 184, 201, 0.1872) 44.56%,
      rgba(51, 184, 201, 0.16797) 48.24%,
      rgba(48, 184, 201, 0.147363) 51.76%,
      rgba(46, 184, 201, 0.1258) 55.44%,
      rgba(44, 184, 201, 0.103704) 59.63%,
      rgba(41, 184, 201, 0.0814963) 64.66%,
      rgba(39, 184, 201, 0.0596) 70.88%,
      rgba(36, 184, 201, 0.038437) 78.62%,
      rgba(34, 184, 201, 0.0184296) 88.21%,
      rgba(32, 184, 201, 0) 100%
    );
  }
  .mask:after {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    right: 0;
    display: block;
    background-image: linear-gradient(
      180deg,
      rgba(60, 26, 229, 0) 0%,
      #4ab8c9 50%,
      rgba(60, 26, 229, 0) 100%
    );
  }
`;

export { StyledDiv };
