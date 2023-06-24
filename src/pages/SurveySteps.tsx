import { useNavigate } from "react-router-dom";
import { TopContainer } from "../components/TopContainer";
import { Step } from "../components/Step";

const steps = [
    {
        title: "Step 1",
        description: "Select a survey",
        image: "/steps/step1take.svg",
    },
    {
        title: "Step 2",
        description: "Start survey",
        image: "/steps/Step3take.svg",
    },
    {
        title: "Step 3",
        description: "Complete and Get the NFT",
        image: "/steps/Step4take.svg",
    }
]


export const SurveySteps = () => {
    const navigator = useNavigate();
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 120,
            padding: "0px 82px",
            paddingTop: 150
        }}>
            <TopContainer title={"Take a survey"} description={"Discover the power of your opinions, collect NFT rewards - get started with surveys on\nHashChange!"} color="electricUltramarine"
                button={{
                    text: "Take a survey",
                    onClick: function (): void {
                        navigator("/respond-survey/select-survey")
                    }
                }} />
            <div style={{
                display: "grid",
                gridTemplateColumns: `0.75fr repeat(${steps.length}, 1fr) 0.75fr`,
                gap: 34, padding: "calc(90px-27px)"
            }}>
                <div />
                {steps.map(
                    (step) => <Step {...step} />
                )}
                <div />
            </div>
        </div>
    )
}
