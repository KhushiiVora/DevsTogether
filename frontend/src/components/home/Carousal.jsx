import Cards from "./Cards";
import { StyledDiv } from "../../styles/carousal.styles";

function Preview() {
  return (
    <StyledDiv>
      <div class="crop">
        <Cards />
        <div class="last-circle"></div>
        <div class="second-circle"></div>
      </div>
      <div class="mask"></div>
      <div class="center-circle"></div>
    </StyledDiv>
  );
}

export default Preview;
