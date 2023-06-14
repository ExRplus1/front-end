import { useNavigate } from "react-router-dom";
import { Step } from "../components/Step";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import { Spacer } from "./Landing";

const steps = [
    {
        title: "Press button to pay",
        description: "Metamask opens up",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Press button to pay",
        description: "Metamask opens up",
        image: "https://via.placeholder.com/200",
    },
    {
        title: "Press button to pay",
        description: "Metamask opens up",
        image: "https://via.placeholder.com/200",
    }
]

export const SurveyPay = () => {
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
                TopBar={() => <TopBar title={"Support your cause"} stepText={"Step 2 of 4"} percentage={0.5} />}
                title={"Support your cause"} description={"We need to tell them what they are paying for, how much, and what happens once they pay"} color="electricUltramarine"
                button={{
                    text: "TODO change",
                    onClick: function (): void {
                        navigator("/respond-survey/start-survey")
                    }
                }}
            />
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
                gap: 34, padding: "calc(90px-27px)"
            }}>
                {steps.map(
                    (step) => <Step {...step} />
                )}
            </div>
            <Spacer newSpace={100} />
        </div>
    )
}
