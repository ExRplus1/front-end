
import { Box } from "../components/Box"
import styled from 'styled-components'
import { colors } from "../constants/colors";
import { ConnectWallet, Text } from "../styles";

const TitlePage = styled.h1`
font-family: 'VCR OSD Mono';
font-style: normal;
font-weight: 400;
font-size: 57.4084px;
line-height: 69px;
/* or 120% */

display: flex;
align-items: center;

color: #FFFFFF;
`;
const DescriptionPage = styled.h2<{ width: string }>`
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

color: #DCDCDC;
`;


export const TopContainer = ({ title, TopBar, description, button, color }: {
    title: string,
    description: string,
    TopBar?: any,
    color: keyof typeof colors,
    button: {
        text: string,
        onClick: () => void
    } | null
}) => {
    return <Box color={color} width="calc(100% - 71px * 2)" style={{
        padding: "46px 71px",
        paddingBottom: 90
    }}>
        {/* react types making a fool out of myself */}
        {TopBar ? <TopBar /> : null}
        <TitlePage>
            {title}
        </TitlePage>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
        }}>
            <DescriptionPage width={button === null ? "100%" : "70%"}>
                {description}
            </DescriptionPage>
            {button ? <div style={{
                height: 71
            }}>
                <ConnectWallet type="whiteBlack" onClick={button.onClick}>
                    <Text>
                        {button.text}
                    </Text>
                </ConnectWallet>
            </div> : null}
        </div>
    </Box>
}