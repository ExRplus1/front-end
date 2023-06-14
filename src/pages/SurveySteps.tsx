import { useNavigate } from "react-router-dom";
import { TopContainer } from "../components/TopContainer";
import { Step } from "../components/Step";
const steps = [
    {
        title: "Step 1",
        description: "Select a survey",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Step 2",
        description: "Pay for the survey",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Step 3",
        description: "Start the survey",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Step 4",
        description: "Complete and Get the NFT",
        image: "https://via.placeholder.com/200",
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
                gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                gap: 34, padding: "calc(90px-27px)"
            }}>
                {steps.map(
                    (step) => <Step {...step} />
                )}
            </div>
        </div>
    )
}
