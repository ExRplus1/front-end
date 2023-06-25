import { useEffect, useState } from "react";
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
import { SurveyCard } from "./SelectSurvey";
import { images } from "../constants/nftImages";
import { styled } from "styled-components";
export const Link = styled.a`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
  cursor: pointer;
  color:white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 300px;
`


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const claimNft = async () => {
    try {
      const assoc = await associateNft(nftAddress);
      console.log(assoc)
      if (+assoc.status === 1)
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
        description={`You completed the survey! Your data is persisted in blockchain.`}
        color="electricUltramarine"
        button={null}
      />


      <div style={{
        maxHeight: 300,
        display: "flex",
        justifyContent: "space-evenly", alignItems: "center",
      }}>
        <div style={{
          display: "grid",
        }}>
          <Link href={`${pinata}${surveyHash}`} target="_blank"
          >
            {`Survey ${pinata}${surveyHash}`}
          </Link>
          <Link href={`${pinata}${answerHash}`} target="_blank"
          >
            {`Answer ${pinata}${answerHash}`}
          </Link>
        </div>
        <div
          style={{
            alignSelf: "center",
            maxHeight: 300,
            maxWidth: 300,
          }}
        >
          <SurveyCard
            id={""}
            description={""}
            type={""}
            image={images[+nftSerial % images.length]}
            organization={""}
            title={"Click On The Card To Claim Your NFT"}
            color={"electricUltramarine"}
            onClick={() => claimNft()}
          />
        </div>
      </div>
      <Spacer newspace={100} />
    </div >
  );
};
