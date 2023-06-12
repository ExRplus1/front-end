import styled from "styled-components";
import { colors } from "../constants/colors"

export const Box = styled.div<{ width?: string, height?: string, color?: keyof typeof colors }>`
    width: ${({ width }) => width ?? "100%" };
    height: ${({ height }) => height ?? "100%" };
    background-color: ${props => props.color ? colors[props.color] : null};
    overflow: hidden;
    border-radius: 40px;
`;