import { useEffect, useState } from "react";
import { images } from "../constants/nftImages";
import { SurveyCard } from "./SelectSurvey";
import { getUserAnswers } from "../services/utils";

export const MyAnswers = () => {
  const pinata = process.env.REACT_APP_PINATA_ENDPOINT;

  const [nfts, setNfts] = useState<Array<{serial:number, url:string, description: string}>>([]);

  useEffect(() => {
    (async () => {
      const answ = await getUserAnswers();

    console.log(answ)
      if (answ) {
        setNfts(
          answ.map((a: any) => ({
            description: a[1],
            serial: Number(a[3]),
            url: a[1],
          }))
        );
      }
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        gap: "20px",
        margin: "40px",
      }}
    >
      {nfts.map((nft) => (
        <div
          key={nft.serial}
          style={{
            maxWidth: 300,
          }}
        >
          <SurveyCard
            id={""}
            description={`${nft.description.slice(0, 18)}...`}
            type={""}
            image={images[+nft.serial % images.length]}
            organization={""}
            title={""}
            color={"electricUltramarine"}
            onClick={() => {
              window.open(`${pinata}${nft.url}`, "_blank");
            }}
          />
        </div>
      ))}
    </div>
  );
};
