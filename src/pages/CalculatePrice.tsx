import { TopContainer } from '../components/TopContainer'
import { useNavigate } from 'react-router-dom'
import { TSurveyForm, surveySchema } from './UploadJson';
import { useState, useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { styled } from 'styled-components';

const StyledTable = styled.table`
    border-collapse: collapse;
    color: white;
    tr, th {
        color: white;

    }
    `;
const PriceCalculator = () => {
    // price calculator table with one row and table header
    return <div>
        <StyledTable>
            <tr>
                <th>Number of questions</th>
                <th>Participant count</th>
                <th>Date Range of survey</th>
                <th>Flat survey price</th>
                <th>Hedera network taxes</th>
            </tr>
            <tr>
                <td>9-10</td>
                <td>0.1</td>
                <td>1</td>
            </tr>
        </StyledTable>
    </div>
}

export const CalculatePrice = () => {
    const navigator = useNavigate();
    const [survey, setSurvey] = useState<TSurveyForm | null>();
    useEffect(() => {
        const getSurveyIfExists = async () => {
            try {
                const survey = localStorage.getItem("survey");
                const surveyObject = await surveySchema.validate(JSON.parse(survey ?? ""));
                setSurvey(surveyObject);
                console.log({ surveyObject })
            } catch (e) {
                setSurvey(null);
                // if error set survey to null so we don t show the calculator
                // console.log(e);
            }
        };
        getSurveyIfExists();
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 120,
            padding: "0px 82px",
            paddingTop: 150
        }}>
            <TopContainer
                title={"Quote Calculator"}
                TopBar={() => <TopBar
                    color="sheetBlue"
                    title={"Pay and publish"} stepText={"Step 3 of 3"} percentage={1} />}
                description={"Invest in knowledge, shape the future. Decide how many results you will need from your survey and create data encrypted NFT’s for your participants as incentives, motivating them to provide valuable feedback."}
                color="yellowGreen"
                textColor="northSeaBlue"
                descriptionColor="sheetBlue"
                button={survey ? {
                    text: "Pay",
                    onClick: function (): void {
                        console.log("pay you donkey")
                    }
                } : {
                    text: "Go to Upload JSON",
                    onClick: () => {
                        navigator("/createSurvey/uploadJson")
                    }
                }} />
            <PriceCalculator />
        </div>
    )
}
