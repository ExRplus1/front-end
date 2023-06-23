import { Box } from "../components/Box"
import styled from 'styled-components'
import { colors } from "../constants/colors";

const Title = styled.h1<{ color: string }>`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 500;
    font-size: 18.8116px;
    line-height: 28px;
    color: ${({ color }) => color ? color : "#DCDCDC"};
`;
const Description = styled.h2<{ color: string }>`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 23.5145px;
    line-height: 35px;
    color: ${({ color }) => color ? color : "#FFFFFF"};
`;


export const Step = ({
    title,
    description,
    image,
    color,
    textColor,
    Button,
    descriptionColor }: {
        Button?: any,
        title: string,
        description: string,
        image: string,
        color?: keyof typeof colors,
        textColor?: keyof typeof colors,
        descriptionColor?: keyof typeof colors,
    }) => {
    return (
        <Box color={color ?? "electricUltramarine"} style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
        }}>
            <div style={{
                padding: 35,
                display: "grid",
                gridTemplateRows: "1fr 0.5fr"
            }}>
                <div style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: 40,
                }}>
                    <img src={image} alt={title} style={{
                        width: "100%",
                    }} />
                </div>
                <div style={{
                    alignSelf: "flex-end",
                }}>
                    <Title color={textColor ? colors[textColor] : ""}>
                        {title}
                    </Title>
                    <Description color={descriptionColor ? colors[descriptionColor] : ""}>
                        {description}
                    </Description>
                    <div style={{
                        display: "flex"
                    }}>
                        {Button ? <Button /> : null}
                    </div>
                </div>
            </div>
        </Box >
    )
}