import styled from "styled-components";
import { colors } from "@styles/colors";

export const Heading = styled.h1`
  font-size: 70px;
  font-weight: 900;
  color: ${colors.white};
  text-align: center;

  @media screen and (max-width: 1024px) {
    font-size: 55px;
  }

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;
