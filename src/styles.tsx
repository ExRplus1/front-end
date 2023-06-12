import { colors } from "./constants/colors";
import styled from "styled-components";

export const Bg = styled.div`
  background-color: ${colors.bg_black};
  height: 100%;
      padding: 0px 27px;
      overflow-x: hidden;
      overflow-y: scroll;
`;

export const Text = styled.span`
  font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 18px;
line-height: 28px;
cursor: pointer;
`
export const ConnectWallet = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;

  height: 100%;
  max-width: 180px;
  /* White */

  border: 1px solid ${colors.white_border};
  border-radius: 16px;
${Text} {
  color: ${colors.white};
}
  &:hover {
    background-color: ${colors.white_border};
    ${Text} {
      color: ${colors.bg_black};
    }
  }

`;
export const Link = styled.div`
  padding: 0px 24px;
  border-radius: 6px;
  ${Text} {
    color: ${colors.white}
  }
  &:hover {
    ${Text} {
      color: ${colors.green};
    }
  }
`

export const NavBarContainer = styled.nav`
  display: flex;
  flex-direction: row;
  padding: 21px 58px;
  height: 48px;

  ${ConnectWallet} {
    align-self: end;
  }
`;

