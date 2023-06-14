import { Box } from "../components/Box"
import styled from 'styled-components'

const Title = styled.h1`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 500;
    font-size: 18.8116px;
    line-height: 28px;
    color: #DCDCDC;
`;
const Description = styled.h2`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 23.5145px;
    line-height: 35px;
    color: #FFFFFF;
`;


export const Step = ({ title, description, image }: {
    title: string,
    description: string,
    image: string,
}) => {
    return (
        <Box color="electricUltramarine" height="413px" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
        }}>

            <div style={{
                height: "calc(100% - 70px)",
                width: "calc(100% - 70px)",
                padding: 35,
                display: "grid",
                gridTemplateRows: "1fr 0.4fr"
            }}>
                <div style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: 40,
                }}>
                    <img src={image} alt={title} width="100%" />
                </div>
                <div style={{
                    alignSelf: "flex-end",
                }}>
                    <Title>
                        {title}
                    </Title>
                    <Description>
                        {description}
                    </Description>
                </div>
            </div>
        </Box >
    )
}