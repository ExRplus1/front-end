import { images } from "../constants/nftImages";
import { SurveyCard } from "./SelectSurvey";

const useGetMyNfts = () => {
    return {
        nfts: [
            {
                nftSerial: "1234",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }, {
                nftSerial: "1233",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }, {
                nftSerial: "1235",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }
            , {
                nftSerial: "1236",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }
            , {
                nftSerial: "1237",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }, {
                nftSerial: "1238",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }, {
                nftSerial: "1239",
                url: "https://www.URL_TO_ANSWERS.com",
                surveyDescription: "SOME DESCRIPTION IN HERE"
            }
        ]
    };
}

export const MyAnswers = () => {
    const { nfts } = useGetMyNfts();
    return (
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            gap: "20px",
            margin: "40px"
        }}>
            {nfts.map((nft) => (
                <div
                    key={nft.nftSerial}
                    style={{
                        maxWidth: 300,
                    }}>
                    <SurveyCard
                        id={""}
                        description={nft.surveyDescription}
                        type={""}
                        image={images[+nft.nftSerial % images.length]}
                        organization={""}
                        title={""}
                        color={"electricUltramarine"}
                        onClick={() => {
                            window.open(nft.url, "_blank");
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
