import { useNavigate, useParams } from "react-router-dom";
import { Step } from "../components/Step";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import { Spacer } from "./Landing";
import { ConnectWallet, Text } from "../styles";

const steps = [
    {
        title: "Step 1",
        description: "",
        image: "/steps/Step2take.svg",
        button: true
    },
    {
        title: "Step 3",
        description: "Metamask opens up",
        image: "/steps/step2metamask.svg",
    },
    {
        title: "Step 4",
        description: "Complete and Get the NFT",
        image: "/steps/Step3pay.svg",
    }
]

export const SurveyPay = () => {
    const navigator = useNavigate();
    const { surveyId } = useParams();
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
                button={null}
            />
            <div style={{
                display: "grid",
                gridTemplateColumns: `0.75fr repeat(${steps.length}, 1fr) 0.75fr`,
                gap: 34, padding: "calc(90px-27px)"
            }}>
                <div />
                {steps.map(
                    (step) => <Step {...step} Button={() => {
                        if (step.button)
                            return <ConnectWallet type="whiteBlack"
                                style={{
                                    marginTop: 10
                                }}
                                onClick={() => {
                                    // metamask pay and redirect
                                }}>
                                <Text>
                                    Press to Pay
                                </Text>
                            </ConnectWallet>
                    }} />
                )}
                <div />
            </div>
            <Spacer newSpace={100} />
        </div>
    )
}
