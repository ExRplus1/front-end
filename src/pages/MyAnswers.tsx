import { useEffect, useState } from "react";
import { images } from "../constants/nftImages";
import { SurveyCard } from "./SelectSurvey";
import { getUserAnswers } from "../services/utils";
import { number } from "yup";

// const useGetMyNfts = () => {
//   return {
//     nfts: [
//       {
//         nftSerial: "1234",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//       {
//         nftSerial: "1233",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//       {
//         nftSerial: "1235",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//       {
//         nftSerial: "1236",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//       {
//         nftSerial: "1237",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//       {
//         nftSerial: "1238",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//       {
//         nftSerial: "1239",
//         url: "https://www.URL_TO_ANSWERS.com",
//         surveyDescription: "SOME DESCRIPTION IN HERE",
//       },
//     ],
//   };
// };

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
