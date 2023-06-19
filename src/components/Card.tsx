import styled from 'styled-components';
import { colors } from '../constants/colors';


export const Container = styled.div`
    border: 0.850482px solid ${colors.blackMana};
    border-radius: 35px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction:column ;
    align-items: center;
`;
const Title = styled.h1`
padding: 40px;
font-family: 'VCR OSD Mono';
font-style: normal;
font-weight: 400;
font-size: 34.0193px;
line-height: 42px;
/* or 124% */

display: flex;
align-items: center;
text-transform: uppercase;
padding-bottom: 0px;

color: ${colors.white};
`;
const Description = styled.h2`
padding: 40px;
font-family: 'Archivo';
font-style: normal;
font-weight: 400;
font-size: 21.2621px;
line-height: 28px;
color: ${colors.white};

`;

export const Card = ({ imgSrc, title, description }: { imgSrc: string, title: string, description: string }) => {
    return (
        <Container>
            <img src={imgSrc} alt={imgSrc} />
            <Title >
                {title}
            </Title>
            <Description >
                {description}
            </Description>
        </Container>
    )
}
