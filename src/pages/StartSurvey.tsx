import { useCallback, useMemo, useState } from "react";
import { TopBar } from "../components/TopBar";
import { TopContainer } from "../components/TopContainer";
import { useFetchSurvey } from "../hooks/useFetchSurvey";
import { Spacer } from "./Landing";
import { useNavigate, useParams } from "react-router-dom";
import {
  QuestionTitle,
  Title,
  ArrowButton,
  DownArrow,
  UpArrow,
  OptionContainer,
  Button,
  OptionText,
} from "./styles";
import { TAnswers, TQuestion } from "./UploadJson";
import { ConnectWallet, Text } from "../styles";
import { execute } from "../services/utils";

type QuestionProps = {
  question: TQuestion;
  single?: boolean;
  respondToQuestion: (answer: number, single: boolean) => void;
  answer: Array<number>;
};

const EndSurvey = ({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <div style={{ height: 650, display: "flex", width: "70vw" }}>
      <div
        style={{
          width: "70vw",
        }}
      >
        <QuestionTitle>Congrats for completing the survey</QuestionTitle>
        {onClick ? <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ConnectWallet type="white" onClick={onClick}>
            <Text>Continue</Text>
          </ConnectWallet>
        </div> : null}
        <Spacer newspace={50} />
      </div>
    </div>
  );
};

const QuestionsContainer = ({
  crtQuestion,
  setCrtQuestion,
  children,
  max,
  questionTitle,
}: {
  crtQuestion: number;
  setCrtQuestion: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactElement<any, any>;
  max: number;
  questionTitle?: string;
}) => {
  return (
    <div style={{ height: 650, display: "flex", width: "70vw" }}>
      <div
        style={{
          width: "70vw",
        }}
      >
        <Title>
          Question {crtQuestion + 1} / {max}
        </Title>
        {questionTitle ? <QuestionTitle>{questionTitle}</QuestionTitle> : null}
        <Spacer newspace={50} />
        {children}
      </div>

      <div style={{ display: "flex", gap: 18, alignSelf: "flex-end" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
          }}
        />{" "}
        :{" "}
        <ArrowButton
          onClick={() => {
            setCrtQuestion((questionNumber) => questionNumber + 1);
          }}
        >
          <DownArrow />
        </ArrowButton>
        {crtQuestion === 0 ? (
          <div
            style={{
              width: "52px",
              height: "52px",
            }}
          />
        ) : (
          <ArrowButton
            onClick={() => {
              setCrtQuestion((questionNumber) => questionNumber - 1);
            }}
          >
            <UpArrow />
          </ArrowButton>
        )}
      </div>
    </div >
  );
}

const MultipleOptionQuestion = ({
  question,
  single,
  respondToQuestion,
  answer,
}: QuestionProps) => {
  return (
    <div
      style={{
        display: "grid",
        gap: 20,
      }}
    >
      {(question?.options ?? []).map((option, index) => (
        <OptionContainer
          key={option.text}
          onClick={() => {
            respondToQuestion(index, single ?? false);
          }}
          $selected={
            answer?.length > 0 ? answer.includes(index).toString() : "false"
          }
        >
          <Button>{String.fromCharCode(65 + index)}</Button>
          <OptionText>{option.text}</OptionText>
        </OptionContainer>
      ))}
    </div>
  );
};

const QuestionFactory = ({
  question,
  respondToQuestion,
  answer,
}: QuestionProps) => {
  switch (question.questionType) {
    case "singleOption":
      return (
        <MultipleOptionQuestion
          question={question}
          single
          respondToQuestion={respondToQuestion}
          answer={answer}
        />
      );
    case "statement":
      return null;
    case "multipleOption":
      return (
        <MultipleOptionQuestion
          question={question}
          respondToQuestion={respondToQuestion}
          answer={answer}
        />
      );
    default:
      return null;
  }
};

export const SurveyMagic = ({
  crtQuestion,
  questions,
  setCrtQuestion,
  respondToQuestions,
  answers,
  onClick,
}: {
  questions: TQuestion[];
  crtQuestion: number;
  setCrtQuestion: React.Dispatch<React.SetStateAction<number>>;
  respondToQuestions: (answer: number, single: boolean) => void;
  answers: Array<TAnswers>;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}) => {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 70vw 1fr",
        }}
      >
        <div />
        {crtQuestion >= questions.length ? (
          <EndSurvey onClick={onClick} />
        ) : (
          <QuestionsContainer
            crtQuestion={crtQuestion}
            setCrtQuestion={setCrtQuestion}
            max={questions.length}
            questionTitle={questions?.[crtQuestion]?.questionText}
          >
            <QuestionFactory
              question={questions[crtQuestion]}
              respondToQuestion={respondToQuestions}
              answer={answers[crtQuestion]?.answers ?? []}
            />
          </QuestionsContainer>
        )}
        <div />
      </div>

      <Spacer newspace={100} />
    </>
  );
};

export const StartSurvey = () => {
  const { data: survey } = useFetchSurvey();
  const { surveyId } = useParams();
  const navigate = useNavigate();

  const questions = useMemo<Array<TQuestion>>(
    () => survey?.questions ?? [],
    [survey?.questions]
  );
  const [crtQuestion, setCrtQuestion] = useState(0);

  // TODO: save in IPFS at the end @drLeo

  const [answers, setAnswers] = useState<Array<TAnswers>>(
    questions.map((question) => {
      return {
        questionId: question.id,
        answers: [],
      };
    })
  );

  const setAnswersForQuestion = useCallback(
    (questionNumber: number) => (answer: number, single: boolean) => {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        const answersPrev = prevAnswers?.[questionNumber]?.answers ?? [];
        const crtAnswer = answersPrev.includes(answer)
          ? answersPrev.filter((ans) => ans !== answer)
          : [...answersPrev, answer];

        prevAnswers[questionNumber] = {
          questionId: questions[questionNumber].id,
          answers: single ? [answer] : crtAnswer,
        };
        if (questions[questionNumber]?.questionType === "singleOption") {
          setCrtQuestion((index) => index + 1);
        }
        return newAnswers;
      });
    },
    [questions]
  );

  const sendAnswers = async () => {
    try {
      const price = "20"; //price for mint the token
      const tx = await execute("answers", { surevyHash: surveyId, answers }, price, surveyId);
      console.log(tx)
      if (tx.status === 1) {
        navigate(`/respond-survey/end/${surveyId}`)
      } else {
        alert("Transaction failed! Please submit again!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 60,
        padding: "0px 82px",
        paddingTop: 150,
      }}
    >
      <TopContainer
        TopBar={() => (
          <TopBar
            title={"Take Survey"}
            stepText={"Step 2 of 3"}
            percentage={0.66}
          />
        )}
        title={survey?.name}
        description={survey?.description}
        color="electricUltramarine"
        button={
          crtQuestion >= questions?.length
            ? {
              text: "Complete Survey",
              onClick: sendAnswers,
            }
            : null
        }
      />
      <SurveyMagic
        questions={questions}
        crtQuestion={crtQuestion}
        setCrtQuestion={setCrtQuestion}
        respondToQuestions={setAnswersForQuestion(crtQuestion)}
        answers={answers}
      />
    </div>
  );
};
