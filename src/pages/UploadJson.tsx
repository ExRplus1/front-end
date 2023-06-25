import { styled } from 'styled-components'
import { TopContainer } from '../components/TopContainer'
import { useNavigate } from 'react-router-dom'
import { Text } from "../styles"
import { colors } from '../constants/colors';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { SurveyMagic } from './StartSurvey';
import { TopBar } from '../components/TopBar';

export const answersSchema = yup.object().shape({
    // surveyId: yup.string().required(),
    questionId: yup.number().required(),
    answers: yup.array().of(yup.number().required()).required()
});

export const questionsSchema = yup.object().shape({
    id: yup.number().required(),
    questionText: yup.string().required(),
    questionType: yup.string().required().oneOf(["singleOption", "statement", "multipleOption"]),
    options: yup.array().of(yup.object().shape({
        id: yup.number().required(),
        text: yup.string().required()
    })).nullable(),
});

export const surveySchema = yup.object().shape({
    description: yup.string().required(),
    name: yup.string().required(),
    questions: yup.array().of(questionsSchema).required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    maxNumberOfVoters: yup.number().required()
});

export type TSurveyForm = yup.InferType<typeof surveySchema>;
export type TQuestion = TSurveyForm["questions"][number];
export type TAnswers = yup.InferType<typeof answersSchema>;

const StyledForm = styled.form`
    input {
        display: none;
    }
    label {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 0px 24px;
        svg {
            color: ${colors.white_border};;
        }

        height: 100%;
        /* White */

        border-radius: 16px;
        &:hover {
            background-color: ${colors.white_border};
            ${Text} {
            color: ${colors.blackMetal};
            }
            svg {
            color: ${colors.blackMetal};;
            }
        }


        background-color: ${colors.blackMetal};
        border: 1px solid ${colors.blackMetal};
        ${Text} {
            color: ${colors.white};
        }
    }
`;

export const UploadJson = () => {
    const [files, setFiles] = useState<TSurveyForm | null>(null);

    const navigate = useNavigate();

    const questions = useMemo<Array<TQuestion>>(() => files?.questions ?? [], [files?.questions]);
    const [crtQuestion, setCrtQuestion] = useState(0);

    // The questions in here do not have an surveyId
    const [answers, setAnswers] = useState<Array<TAnswers>>(questions.map((question) => {
        return {
            // surveyId: "testRunId",
            questionId: question.id,
            answers: []
        }
    }));
    const setAnswersForQuestion = useCallback((questionNumber: number) => (answer: number, single: boolean) => {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            const answersPrev = prevAnswers?.[questionNumber]?.answers ?? [];
            const crtAnswer = answersPrev.includes(answer) ? answersPrev.filter((ans) => ans !== answer) : [...answersPrev, answer];

            prevAnswers[questionNumber] = {
                // surveyId: "testRunId",
                questionId: questions[questionNumber].id,
                answers: single ? [answer] : crtAnswer
            };
            if (questions[questionNumber]?.questionType === "singleOption") {
                setCrtQuestion(index => index + 1);
            }
            return newAnswers;
        });
    }, [questions]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = async ee => {
            if (!ee?.target?.result) return;
            try {
                const valid = await surveySchema.validate(JSON.parse(ee.target.result as string))
                if (valid) {
                    setFiles(valid);
                }
            } catch (e) {
                alert("Invalid JSON file");
            }
        };
    };

    useEffect(() => {
        const getSurveyIfExists = async () => {
            try {
                const survey = localStorage.getItem("survey");
                const surveyObject = await surveySchema.validate(JSON.parse(survey ?? ""));
                setFiles(surveyObject);
            } catch (e) {
                // don t log error as we don t know if the survey is coming from us
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
                title={"Upload Json + Preview"}
                TopBar={() =>
                    <TopBar
                        color="sheetBlue"
                        title={(files?.questions?.length ?? 0) > 0 ? "Check your questions" : "Upload Questions"}
                        stepText={`Step ${(files?.questions?.length ?? 0) > 0 ? 2 : 1} of 3`}
                        percentage={((files?.questions?.length ?? 0) > 0 ? 2 : 1) / (
                            3
                        )}
                    />}
                description={"You need to upload your questions in a JSON format"}
                color="yellowGreen"
                textColor="northSeaBlue"
                descriptionColor="sheetBlue"
                ButtonComponent={() => {
                    return <>
                        <StyledForm>
                            <input
                                type="file"
                                accept="application/JSON"
                                id="inputFile"
                                name="filename"
                                onChange={handleChange}
                            />
                            <label htmlFor="inputFile">
                                <Text>Upload JSON</Text>
                            </label>
                        </StyledForm>
                    </>
                }} />
            {(files?.questions?.length ?? 0) > 0 ?
                <SurveyMagic
                    questions={questions}
                    crtQuestion={crtQuestion}
                    setCrtQuestion={setCrtQuestion}
                    respondToQuestions={setAnswersForQuestion(crtQuestion)}
                    answers={answers}
                    onClick={() => {
                        // Yes, yes; not the best solution... maybe we should use some url parameter :-?
                        localStorage.setItem("survey", JSON.stringify(files));
                        navigate("/createSurvey/calculatePrice");
                    }}

                /> : null}
        </div>
    )
}
