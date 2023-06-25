import { Box } from "../components/Box";
import styled, { css } from "styled-components";
import { colors } from "../constants/colors";
import { ConnectWallet, Text } from "../styles";
import { Card, Container } from "../components/Card";
import { explainers } from "./constants";
import { useNavigate } from "react-router-dom";
import { TakeSurvey } from "./TakeSurveySvg";
import { CreateSurvey } from "./CreateSurvey";
import { Slideshow } from "../components/Slider";
import React from "react";


const PageText = styled.div<{ white?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 80px);
  padding: 0px 41px;
  margin: 40px 0px;
  h1 {
    font-family: "VCR OSD Mono";
    font-style: normal;
    font-weight: 400;
    font-size: 180px;
    line-height: 130px;
    color: ${colors.deepCommitmentToPurple};
    text-transform: capitalize;
  }
  h2 {
    font-family: "Archivo";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 30px;
    color: ${colors.deepCommitmentToPurple};
    text-transform: uppercase;
  }
  h3 {
    font-family: "VCR OSD Mono";
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
    font-family: "Archivo";
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 50px;
    /* identical to box height, or 124% */

    display: flex;
    align-items: center;
  }
  ${ConnectWallet} {
    padding: 2px 24px;
    height: 48px;
  }
  ${({ white }) =>
    white === "true"
      ? css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: ${colors.white};
          }
        `
      : null}
`;
export const Spacer = styled.div<{ newspace: number }>`
  height: calc(${({ newspace }) => newspace}px - 21px);
`;
const Explainer = styled.h1`
  font-family: "VCR OSD Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 34.0193px;
  line-height: 42px;
  /* or 124% */

  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  transform: translateX(-15%) translateY(400px) rotate(-90deg);
  white-space: nowrap;
  color: ${colors.white};
  width: 100%;
`;
const Flex = styled.div<{ direction?: "row" | "column"; gap?: number }>`
  display: flex;
  gap: ${({ gap }) => gap ?? 56}px;
  flex: 1;
  flex-direction: ${({ direction }) => direction ?? "row"};
  width: 100%;
  height: 100%;
`;
export const Landing = () => {
  const navigation = useNavigate();
  return (<Flex direction='column'>
    <Box
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
          <div />
        </PageText>
      </Box>
      <Box >
        {/* add image in here */}
        <Slideshow />
      </Box>
    </Box>
    <Flex direction='row' gap={12}>
      <Box color='green' height='442px'>
        <PageText>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <div >
              <h3>
                Create a survey
              </h3>
            </div>
            <div>
              <img src="images/globe.svg" alt="global" />
            </div>
          </div>
          <h4>
            Data-driven Decisions Start Here
          </h4>
          <div style={{
            alignSelf: "flex-end",
          }}>
            <ConnectWallet type="whiteBlack" onClick={() => navigation("/createSurvey/start")}>
              <CreateSurvey />
              <Text style={{ paddingLeft: 12 }}>
                Create a survey
              </Text>
            </ConnectWallet>
          </div>
        </PageText>
      </Box>
      <Box color='electricUltramarine' height='442px'>
        <PageText white="true">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <div>
              <h3>
                Take a survey
              </h3>
            </div>
            <div>
              <img src="images/door.svg" alt="door" />
            </div>
          </div>
          <h3>
          </h3>
          <h4>
            Your Opinion Matters: Shape the World Around You
          </h4>
          <div style={{
            alignSelf: "flex-end",
          }}>
            <ConnectWallet type="whiteBlack" onClick={() => navigation("/respond-survey")}>
              <TakeSurvey />
              <Text style={{ paddingLeft: 12 }}>
                Take a survey
              </Text>
            </ConnectWallet>
          </div>
        </PageText>
      </Box>
    </Flex>
    <Spacer newspace={51} />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: `194px 1fr`,
        height: 726,
        gap: 36,
      }}
    >
      <Container style={{}}>
        <Explainer>Why use hashchange?</Explainer>
      </Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${explainers.length}, 1fr)`,
          height: 726,
          gap: 14,
        }}
      >
        {explainers.map((explainerInfo) => (
          <React.Fragment key={explainerInfo.title}>
            <Card {...explainerInfo} />
          </React.Fragment>
        ))}
      </div>
    </div>
    <Spacer newspace={42} />
    <Flex gap={12}>
      <Box height="940px">
        <img src="/images/hash_change.svg" alt="hash_change_svg" height="100%" width="100%" />
      </Box>
      <Box color="dreamlessSleep" height="940px">
        <PageText
          style={{
            justifyContent: "space-evenly",
          }}
        >
          <h1
            style={{
              color: colors.white,
              fontSize: 100,
              lineHeight: "80px",
            }}
          >
            How
            <br />
            does{"\n"}
            <span
              style={{
                color: colors.green,
                fontSize: 100,
                lineHeight: "80px",
              }}
            >
              HashChange
            </span>
            <br />
            work?
          </h1>
          <h4
            style={{
              color: colors.white,
            }}
          >
            Powered by the Hedera network we develop and deploy fast,
            efficient, low-cost, secure, transparent, trustworthy and
            carbon-negative smart contracts.
          </h4>
        </PageText>
      </Box>
    </Flex>
    <Spacer newspace={120} />
  </Flex>
  );
};
