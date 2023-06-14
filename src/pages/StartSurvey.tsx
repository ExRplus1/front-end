import { useMemo, useState } from "react";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import { useFetchSurvey } from "../hooks/useFetchSurvey";
import { Spacer } from "./Landing";
import styled from 'styled-components'

const Title = styled.h1`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 500;
    font-size: 18.8116px;
    line-height: 50px;
    color: #DCDCDC;
`;

const QuestionTitle = styled.h1`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    color: #FFFFFF;
`;
type Question = {
    id: number,
    questionText: string,
    questionType: "optionScale" | "singleOption" | "statement" | "multipleOption",
    options: Array<{ id: number, text: string }>
}

const ArrowButton = styled.div`
box-sizing: border-box;

display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;

width: 52px;
height: 52px;
border: 1px solid #FFFFFF;
border-radius: 4px;
`;

const QuestionsContainer = ({
    crtQuestion, setCrtQuestion, children, max,
    questionTitle
}: { crtQuestion: number, setCrtQuestion: React.Dispatch<React.SetStateAction<number>>, children: React.ReactElement<any, any>, max: number, questionTitle?: string }) => {
    return <div style={{ height: 650, display: "flex" }}>
        <p>
            <Title>
                Question {crtQuestion + 1} / {max}
            </Title>
            {questionTitle ? <QuestionTitle>
                {questionTitle}
            </QuestionTitle> : null}
            <Spacer newSpace={50} />
            {children}
        </p>

        <div style={{ display: "flex", gap: 18, alignSelf: "flex-end" }}>
            {crtQuestion === max - 1 ? null : <ArrowButton onClick={() => {
                setCrtQuestion(questionNumber => questionNumber + 1)
            }}>
                <DownArrow />
            </ArrowButton>}
            {crtQuestion === 0 ? null : <ArrowButton
                onClick={() => {
                    setCrtQuestion(questionNumber => questionNumber - 1)
                }}>
                <UpArrow />
            </ArrowButton>
            }
        </div >

    </div>
}
const OptionScaleQuestion = ({ question }: { question: Question }) => {
    throw new Error("V2 - Nice to have for now");
    return <>
    </>
}

const OptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 39px 8px 17px;
    gap: 15px;
    border: 1.89706px solid #828282;
    width: fit-content;
    border-radius: 16px;
`;
const Button = styled.span`
    width: 39px;
    height: 38px;

    background: #D9D9D9;
    border-radius: 4px;
    font-family: 'Archivo';
    font-style: normal;
    justify-content: center;
    font-weight: 400;
    font-size: 22.7647px;
    line-height: 54px;
    /* identical to box height, or 235% */

    display: flex;
    align-items: center;

    color: #070707;
`;
const OptionText = styled.span`
    font-family: 'Archivo';
    font-style: normal;
    font-weight: 400;
    font-size: 22.7647px;
    line-height: 54px;
    color: #868484;
    text-align: center;
`;

const DownArrow = styled.span`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  `;


const UpArrow = styled.span`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  `;

const MultipleOptionQuestion = ({ question, single }: { question: Question, single?: boolean }) => {
    // do the selected stuff

    return <div style={{
        display: "grid",
        gap: 20,
    }}>
        {(question?.options ?? []).map((option, index) => <OptionContainer>
            <Button>
                {String.fromCharCode(65 + index)}
            </Button>
            <OptionText>
                {option.text}
            </OptionText>
        </OptionContainer>)}
    </div>
}

const QuestionFactory = ({ question }: { question: Question }) => {
    switch (question.questionType) {
        case "optionScale":
            return <OptionScaleQuestion question={question} />
        case "singleOption":
            return <MultipleOptionQuestion question={question} single />
        case "statement":
            return null;
        case "multipleOption":
            return <MultipleOptionQuestion question={question} />
        default:
            return <></>
    }
}

export const StartSurvey = () => {
    const { data: survey } = useFetchSurvey();
    const questions = useMemo(() => survey?.questions ?? [], [survey?.questions]);
    const [crtQuestion, setCrtQuestion] = useState(0);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 60,
            padding: "0px 82px",
            paddingTop: 150
        }}>
            <TopContainer
                TopBar={() =>
                    <TopBar
                        title={"Take Survey"}
                        stepText={"Step 3 of 4"} percentage={0.75}
                    />
                }
                title={survey?.name} description={survey?.description}
                color="electricUltramarine"
                button={null} />
            <div style={{
                display: 'grid',
                gridTemplateColumns: '0.3fr 1fr 0.3fr',
            }}>
                <div />
                {
                    <QuestionsContainer crtQuestion={crtQuestion} setCrtQuestion={setCrtQuestion} max={questions.length}
                        questionTitle={questions?.[crtQuestion]?.questionText}
                    >
                        <QuestionFactory question={questions[crtQuestion]} />
                    </QuestionsContainer>
                }
                <div />
            </div>

            <Spacer newSpace={100} />
        </div>
    )
}
