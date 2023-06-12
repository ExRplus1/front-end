import { Box } from '../components/Box';
import styled from 'styled-components';
import { colors } from '../constants/colors';
import { ConnectWallet, Text } from '../styles';

const PageText = styled.div`
    display: flex;
    flex-direction: column;
    padding:0px 41px;

h1 {
    font-family: 'VCR OSD Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 180px;
    line-height: 130px;
    color: ${colors.deepCommitmentToPurple};
    text-transform: capitalize;
}
h2 {
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 30px;
    color: ${colors.deepCommitmentToPurple};
    text-transform: capitalize;
}
h3 {
    font-family: 'VCR OSD Mono';
    font-style: normal;
    font-weight: 400;
    font-size: 60px;
    line-height: 50px;
    /* or 82% */

    display: flex;
    align-items: center;
    text-transform: uppercase;

}
h4 {
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 50px;
    /* identical to box height, or 124% */

    display: flex;
    align-items: center;
}
${ConnectWallet} {
    padding: 0px 24px;
    height: 48px;

    border: 1px solid ${colors.blackMetal};
    border-radius: 16px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
    ${Text} {
    color: ${colors.blackMetal};
    }
}
`;
const Flex = styled.div<{ direction?: "row" | "column", gap?: number }>`
    display: flex;
    gap: ${({ gap }) => gap ?? 56}px;
    flex:1;
    flex-direction: ${({ direction }) => direction ?? "row"};
    width: 100%;
    height: 100%;
`
export const Landing = () => {
    return (<Flex direction='column'>
        <Box
            width={"100%"}
            height={"732px"}
            color={"blueprint"}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
            }}
        >
            <Box>
                <PageText>
                    <h1>
                        hash change
                    </h1>
                    <h2>
                        The Decentralized Survey Platform for All
                    </h2>
                    <ConnectWallet>
                        <Text>
                            Spread the word
                        </Text>
                    </ConnectWallet>
                </PageText>
            </Box>
            <Box color="deepCommitmentToPurple">
                {/* add image in here */}
            </Box>
        </Box>
        <Flex direction='row' gap={12}>
            <Box color='green' height='442px'>
                <PageText>
                    <h3>
                        Create a survey
                    </h3>
                    <h4>
                        Data-driven Decisions Start Here
                    </h4>
                </PageText>
            </Box>
            <Box color='electricUltramarine' height='442px'>

            </Box>
        </Flex>

    </Flex>
    )
}
