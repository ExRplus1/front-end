import { Box } from "../components/Box";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import styled, { css } from "styled-components";
import { colors } from "../constants/colors";
import { Spacer } from "./Landing";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSurveys } from "../services/utils";

const Title = styled.h1`
  font-family: "Archivo";
  font-style: normal;
  font-weight: 500;
  font-size: 18.8116px;
  line-height: 28px;
  color: #dcdcdc;
`;
const Description = styled.h2`
  font-family: "Archivo";
  font-style: normal;
  font-weight: 500;
  font-size: 18.8116px;
  line-height: 28px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;

  color: #dcdcdc;
`;
const OrganizationName = styled.h2`
  font-family: "Archivo";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;

  display: flex;
  align-items: center;

  color: ${colors.blackMana};
  font-style: italic;
`;
const Type = styled.h2<{ color: keyof typeof colors }>`
  font-family: "Archivo";
  padding: 22px 0px;
  padding-bottom: 0px;
  font-style: normal;
  font-weight: 500;
  font-size: 18.8116px;
  line-height: 28px;
  color: ${({ color }) => colors[color]};
`;

const Intractable = styled(Box) <{ $isIntractable?: string }>`
  ${({ $isIntractable }) =>
    $isIntractable === "true"
      ? css`
          &:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
      : null}
`;

export const SurveyCard = ({
  id,
  title,
  type,
  organization,
  description,
  color,
  image,
  onClick,
}: {
  id: string,
  title: string,
  type: string,
  organization: string,
  description: string,
  color: any,
} & { onClick?: () => void; image?: string }) => {
  return (
    <Intractable
      onClick={onClick}
      $isIntractable={(!!onClick)?.toString()}
      style={{
        border: `1.5px solid ${colors[color as keyof typeof colors]}`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          width="100%"
          style={{
            aspectRatio: "1/1",
          }}
        />
      ) : null}
      <div
        style={{
          height: "calc(100% - 70px)",
          width: "calc(100% - 70px)",
          padding: 35,
        }}
      >
        <div>
          <Type color={color}>{type}</Type>
          <Title>{title}</Title>
          <OrganizationName>{organization}</OrganizationName>
          <Description>{description}</Description>
        </div>
      </div>
    </Intractable>
  );
};

export const SelectSurvey = () => {
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState([{
    id: "",
    title: "",
    description: "",
    type: "",
    organization: "",
    color: "",
  }]);

  useEffect(() => {
    (async () => {
      try {
        const s = await getSurveys();
        // here we should query IPFS for the survey props
        s.foreach((_s: any) => {
          setSurveys([{
            id: _s[0],
            title: "Climate Change",
            description: "How do you feel about healthcare?",
            type: "Climate",
            organization: "UN",
            color: "electricUltramarine",
          }]);
        })
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 120,
        padding: "0px 82px",
        paddingTop: 150,
      }}
    >
      <TopContainer
        TopBar={() => (
          <TopBar
            title={"Select a Survey"}
            stepText={"Step 1 of 3"}
            percentage={0.33}
          />
        )}
        title={"Select a survey"}
        description={
          "From climate change to healthcare, the choice is yours - take surveys on HashChange and earn NFT rewards!"
        }
        color="electricUltramarine"
        button={null}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, 1fr)`,
          gap: 38,
        }}
      >
        {surveys.map((survey) => (
          <SurveyCard
            onClick={() => {
              navigate(`/respond-survey/start-survey/${survey.id}`);
            }}
            key={survey.id}
            {...survey}
          />
        ))}
      </div>
      <Spacer newspace={100} />
    </div>
  );
};
