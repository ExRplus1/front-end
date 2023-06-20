import { useNavigate } from "react-router-dom";
import { TopContainer } from "../components/TopContainer";
import { Step } from "../components/Step";
import { CreateSurvey } from "./CreateSurvey";
const steps = [
    {
        title: "Step 1",
        description: "Calculate the cost",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Step 2",
        description: "Upload the survey",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Step 3",
        description: "Pay",
        image: "https://via.placeholder.com/200",
    }
]


// Claim back care sa fie check
// date range
// category si level nu decomandata 

export const CreateSurveyPage = () => {
    const navigator = useNavigate();
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 120,
            padding: "0px 82px",
            paddingTop: 150
        }}>
            <TopContainer
                title={"Create a survey"}
                description={"Your questions, your impact. Start a survey and shape the future"}
                color="yellowGreen"
                textColor="northSeaBlue"
                descriptionColor="sheetBlue"
                button={{
                    text: "Create survey",
                    Icon: () => <div style={{ paddingRight: 10, display: "grid", placeItems: "center" }}> <CreateSurvey /> </div>,
                    onClick: function (): void {
                        navigator("/createSurvey/uploadJson")
                    }
                }} />
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                gap: 34, padding: "calc(90px-27px)"
            }}>
                {steps.map(
                    (step) => <Step {...step}
                        color="yellowGreen"
                        textColor="northSeaBlue"
                        descriptionColor="sheetBlue"
                    />
                )}
            </div>
        </div>
    )
}
