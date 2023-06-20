
import { Box } from "../components/Box"
import styled from 'styled-components'
import { colors } from "../constants/colors";
import { ConnectWallet, Text } from "../styles";

const TitlePage = styled.h1<{ color: string }>`
font-family: 'VCR OSD Mono';
font-style: normal;
font-weight: 400;
font-size: 57.4084px;
line-height: 69px;
/* or 120% */

display: flex;
align-items: center;

color: ${({ color }) => color ? color : "#FFFFFF"};
`;
const DescriptionPage = styled.h2<{ width: string, color: string }>`
font-family: 'Archivo';
width: ${({ width }) => width};
word-wrap: break-word;
white-space: normal;

font-style: normal;
font-weight: 500;
font-size: 29.3931px;
line-height: 44px;
/* or 150% */

display: flex;
align-items: center;
color: ${({ color }) => color ? color : "#DCDCDC"};

`;


export const TopContainer = ({
    title,
    TopBar,
    description,
    button,
    color,
    textColor,
    descriptionColor, ButtonComponent
}: {
    title: string,
    description: string,
    TopBar?: any,
    color: keyof typeof colors,
    textColor?: keyof typeof colors,
    descriptionColor?: keyof typeof colors,
    ButtonComponent?: any,
    button?: {
        text: string,
        Icon?: any,
        onClick: () => void
    } | null
}) => {
    return <Box color={color} width="calc(100% - 71px * 2)" style={{
        padding: "46px 71px",
        paddingBottom: 90
    }}>
        {/* react types making a fool out of myself */}
        {TopBar ? <TopBar /> : null}
        <TitlePage color={textColor ? colors[textColor] : ""}>
            {title}
        </TitlePage>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
        }}>
            <DescriptionPage width={button === null ? "100%" : "70%"} color={descriptionColor ? colors[descriptionColor] : ""}>
                {description}
            </DescriptionPage>
            {ButtonComponent ? <ButtonComponent /> : null}
            {button ? <div style={{
                height: 71
            }}>
                <ConnectWallet type="whiteBlack" onClick={button.onClick}>
                    {button.Icon ? <button.Icon /> : null}
                    <Text>
                        {button.text}
                    </Text>
                </ConnectWallet>
            </div> : null}
        </div>
    </Box>
}