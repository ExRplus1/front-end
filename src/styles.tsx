import { colors } from "./constants/colors";
import styled, { css } from "styled-components";

export const Bg = styled.div`
  background-color: ${colors.blackMetal};
  height: 100%;
  padding: 0px 27px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const Text = styled.span<{ color?: string }>`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  cursor: pointer;
  color: ${({ color }) => color};
`
export const ConnectWallet = styled.span<{ type: "black" | "white" | "whiteBlack" }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  svg {
    color: ${colors.white_border};;
  }

  height: 100%;
  /* White */

  border-radius: 16px;
  &:hover {
    background-color: ${colors.white_border};
    ${Text} {
      color: ${colors.blackMetal};
    }
    svg {
    color: ${colors.blackMetal};;
    }
  }


${({ type }) => {
    switch (type) {
      case "black":
        return css`
            border: 1px solid ${colors.blackMetal};
            border-radius: 16px;
            ${Text} {
                color: ${colors.blackMetal};
            }
        `
      case "white":
        return css`
            border: 1px solid ${colors.white_border};
            ${Text} {
              color: ${colors.white};
            }
        `
      case "whiteBlack":
        return css`
          background-color: ${colors.blackMetal};
          border: 1px solid ${colors.blackMetal};
          ${Text} {
            color: ${colors.white};
          }
        `
    }
  }}
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

