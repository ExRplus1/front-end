import React, { useEffect, useState } from "react";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import { Spacer } from "./Landing";
import { useParams } from "react-router-dom";
import { associateNft, getAnswerForSurvey, getNftAddressForSurveyHash, transferNft } from "../services/utils";

export const EndSurvey = () => {
  const [nftAddress, setNftAddress] = useState("");
  const [nftSerial, setNftSerial] = useState("");
  const [surveyHash, setSurveyHash] = useState("");
  const [answerHash, setAnswerHash] = useState("");

  const pinata = process.env.REACT_APP_PINATA_ENDPOINT;

  const { surveyId } = useParams();
  useEffect(() => {
    (async () => {
      const nftAddress = await getNftAddressForSurveyHash(surveyId as string); 
      const answer = await getAnswerForSurvey(surveyId as string);
      
      setSurveyHash(answer[0][0]);
      setAnswerHash(answer[0][1]);
      setNftAddress(nftAddress);
      setNftSerial(answer[0][3]);
    })();
  }, []);

  const claimNft = async () => {
    try {
        await associateNft(nftAddress);
        await transferNft(nftAddress, nftSerial as unknown as number)
    } catch (e) {
        console.log(e)
        
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 60,
        padding: "0px 82px",
        paddingTop: 150,
      }}
    >
      <TopContainer
        TopBar={() => (
          <TopBar title={"Complte"} stepText={"Step 4 of 4"} percentage={1} />
        )}
        title={`Congratulation!`}
        description={`You completed the survey! Your data are persisted in blockchain and now there are transparent but anonymous and can be consulted here:`}
        color="electricUltramarine"
        button={{text: "ClaimNFT", onClick: claimNft}}
      />
      <TopContainer
        title={`SoulBodyNFT: ${nftAddress}[${nftSerial}]`}
        description={`Survey ${pinata}${surveyHash} Answer ${pinata}${answerHash}`}
        color="electricUltramarine"
        button={null}
      />
      <Spacer newSpace={100} />
    </div>
  );
};
