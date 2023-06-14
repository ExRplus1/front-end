import { Box } from "../components/Box";
import { TopBar } from "../components/TopBar"
import { TopContainer } from "../components/TopContainer"
import styled from 'styled-components'
import { colors } from "../constants/colors";
import { Spacer } from "./Landing";
import { useNavigate } from "react-router-dom";

const surveys: Array<{
  id: string,
  title: string,
  type: string,
  organization: string,
  description: string,
  image: string,
  color: keyof typeof colors
}> = [
    {
      id: "some-id",
      title: "Climate Change",
      description: "How do you feel about healthcare?",
      type: "Climate",
      organization: "UN",
      color: "electricUltramarine",
      image: "https://via.placeholder.com/200",
    },
    {
      id: "some-id",
      title: "Healthcare",
      type: "Healthcare",
      organization: "WHO",
      description: "Description of the survey upt to two sentances only no more than maybe the amount of text needed for 4 lines 126characters",
      image: "https://via.placeholder.com/200",
      color: "red"
    },
    {
      id: "some-id",
      title: "Healthcare",
      type: "Healthcare",
      organization: "WHO",
      description: "Description of the survey upt to two sentances only no more than maybe the amount of text needed for 4 lines 126characters",
      image: "https://via.placeholder.com/200",
      color: "red"
    },
    {
      id: "some-id",
      title: "Healthcare",
      type: "Healthcare",
      organization: "WHO",
      description: "Description of the survey upt to two sentances only no more than maybe the amount of text needed for 4 lines 126characters",
      image: "https://via.placeholder.com/200",
      color: "red"
    },
    {
      id: "some-id",
      title: "Healthcare",
      type: "Healthcare",
      organization: "WHO",
      description: "Description of the survey upt to two sentances only no more than maybe the amount of text needed for 4 lines 126characters",
      image: "https://via.placeholder.com/200",
      color: "red"
    },
  ];

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
font-weight: 500;
font-size: 18.8116px;
line-height: 28px;
/* identical to box height, or 150% */

display: flex;
align-items: center;

color: #DCDCDC;

`;
const OrganizationName = styled.h2`
  font-family: 'Archivo';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 28px;
/* identical to box height, or 150% */

display: flex;
align-items: center;

color: ${colors.blackMana};
font-style: italic;
`;
const Type = styled.h2<{ color: keyof typeof colors }>`
font-family: 'Archivo';
padding:22px 0px ;
padding-bottom: 0px;
font-style: normal;
font-weight: 500;
font-size: 18.8116px;
line-height: 28px;


color: ${({ color }) => colors[color]};
`;

const SurveyCard = ({
  title,
  id: surveyId,
  type,
  organization,
  description,
  image,
  color,
}: typeof surveys[number]) => {
  const navigate = useNavigate();
  return <Box
    onClick={() => {
      navigate(`/respond-survey/pay/${surveyId}`)
    }}
    style={{
      border: `1.5px solid ${colors[color as keyof typeof colors]}`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
    }}>

    <div style={{
      height: "calc(100% - 70px)",
      width: "calc(100% - 70px)",
      padding: 35,
    }}>
      <div style={{
        overflow: "hidden",
        width: "100%",
      }}>
        <img src={image} alt={title} width="100%" />
      </div>
      <div>
        <Type color={color}>
          {type}
        </Type>
        <Title>
          {title}
        </Title>
        <OrganizationName>
          {organization}
        </OrganizationName>
        <Description>
          {description}
        </Description>
      </div>
    </div>
  </Box >
}


export const SelectSurvey = () => {

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 120,
      padding: "0px 82px",
      paddingTop: 150
    }}>
      <TopContainer
        TopBar={() => <TopBar title={"Select a Survey"} stepText={"Step 1 of 4"} percentage={0.25} />}
        title={"Select a survey"} description={"From climate change to healthcare, the choice is yours - take surveys on HashChange and earn NFT rewards!"}
        color="electricUltramarine"
        button={null} />
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(4, 1fr)`,
        gap: 38
      }}>
        {
          surveys.map((survey) => <SurveyCard {...survey} />)
        }
      </div>
      <Spacer newSpace={100} />
    </div>
  )
}
