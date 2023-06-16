import { Box } from "../components/Box";
import styled, { css } from "styled-components";
import { colors } from "../constants/colors";
import { ConnectWallet, Text } from "../styles";
import { Card, Container } from "../components/Card";
import { explainers } from "./constants";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

import { upload } from "@spheron/browser-upload";
import surveys from "../abi/Surveys.json";
import { ethers } from "ethers";
import { useState } from "react";
import { useAppContext } from "../hooks/useAppContext";

const PageText = styled.div<{ white?: boolean }>`
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
    white
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
export const Spacer = styled.div<{ newSpace: number }>`
  height: calc(${({ newSpace }) => newSpace}px - 21px);
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
                    <div></div>
                    {/* <div style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <ConnectWallet type='black'>
                            <Text>
                                Spread the word
                            </Text>
                        </ConnectWallet>
                    </div> */}
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
                    <div style={{
                        alignSelf: "flex-end",
                    }}>
                        <ConnectWallet type="whiteBlack" onClick={()=>{}}>
                            <Text>
                                Create a survey
                            </Text>
                        </ConnectWallet>
                    </div>
                </PageText>
            </Box>
            <Box color='electricUltramarine' height='442px'>
                <PageText white>
                    <h3>
                        Take a survey
                    </h3>
                    <h4>
                        Your Opinion Matters: Shape the World Around You
                    </h4>
                    <div style={{
                        alignSelf: "flex-end",
                    }}>
                        <ConnectWallet type="whiteBlack" onClick={() => navigation("/respond-survey")}>
                            <Text>
                                Take a survey
                            </Text>
                        </ConnectWallet>
                    </div>
                </PageText>
            </Box>
        </Flex>
        <Spacer newSpace={51} />

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
            <Card {...explainerInfo} />
          ))}
        </div>
      </div>
      <Spacer newSpace={42} />
      <Flex gap={12}>
        <Box color="blueprint" height="940px"></Box>
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
              <h1
                style={{
                  color: colors.green,
                  fontSize: 100,
                  lineHeight: "80px",
                }}
              >
                HashChange
              </h1>
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
      <Spacer newSpace={120} />
      <Footer />
    </Flex>
  );
};
