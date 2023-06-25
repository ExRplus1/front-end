import React, { useEffect, useState } from "react";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import { Spacer } from "./Landing";
import { useParams } from "react-router-dom";
import {
  associateNft,
  getAnswerForSurvey,
  getNftAddressForSurveyHash,
  transferNft,
} from "../services/utils";



export const EndSurvey = () => {
  const [nftAddress, setNftAddress] = useState("");
  const [nftSerial, setNftSerial] = useState("");
  const [surveyHash, setSurveyHash] = useState("");
  const [answerHash, setAnswerHash] = useState("");

  const pinata = process.env.REACT_APP_PINATA_ENDPOINT;

  const { surveyId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const nftAddress = await getNftAddressForSurveyHash(surveyId as string);
        setNftAddress(nftAddress);
        const answer = await getAnswerForSurvey(surveyId as string);
        setSurveyHash(answer[0][0]);
        setAnswerHash(answer[0][1]);
        setNftSerial(answer[0][3]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [surveyId]);

  const claimNft = async () => {
    try {
      const assoc = await associateNft(nftAddress);
      console.log(assoc)
      if (assoc.status == 1)
        await transferNft(nftAddress, nftSerial as unknown as number);
    } catch (e) {
      console.log(e);
    }
  };

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
          <TopBar title={"Complete"} stepText={"Step 3 of 3"} percentage={1} />
        )}
        title={`Congratulation!`}
        description={`You completed the survey! Your data are persisted in blockchain.`}
        color="electricUltramarine"
        button={{ text: "Claim NFT", onClick: claimNft }}
      />
      <TopContainer
        title={`SoulBounded NFT: ${nftAddress}[${nftSerial}]`}
        description={`Survey ${pinata}${surveyHash} Answer ${pinata}${answerHash}`}
        color="electricUltramarine"
        button={null}
      />      
      <Spacer newspace={100} />
    </div>
  );
};
