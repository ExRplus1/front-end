import { useNavigate } from "react-router-dom";
import { TopContainer } from "../components/TopContainer";
import { Step } from "../components/Step";
import { CreateSurvey } from "./CreateSurvey";
const steps = [
    {
        title: "Step 1",
        description: "Upload JSON + Review",
        image: "/steps/step1create.svg",
    },
    {
        title: "Step 2",
        description: "Calculate the Cost",
        image: "/steps/step2create.svg",
    },
    {
        title: "Step 3",
        description: "Pay",
        image: "/steps/step3create.svg",
    }
]


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
                gridTemplateColumns: `0.75fr repeat(${steps.length}, 1fr) 0.75fr`,
                gap: 34, padding: "calc(90px-27px)"
            }}>
                <div />
                {steps.map(
                    (step) => <Step {...step}
                        color="yellowGreen"
                        textColor="northSeaBlue"
                        descriptionColor="sheetBlue"
                    />
                )}
                <div />
            </div>
        </div>
    )
}
