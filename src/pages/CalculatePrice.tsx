import { TopContainer } from "../components/TopContainer";
import { useNavigate } from "react-router-dom";
import { TSurveyForm, surveySchema } from "./UploadJson";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { TopBar } from "../components/TopBar";
import { styled } from "styled-components";
import { execute } from "../services/utils";
import { useAppContext } from "../hooks/useAppContext";

const StyledTable = styled.table`
  width: 100%;
  tbody {
    border-collapse: collapse;
    color: white;
    border-spacing: 0;
    td {
      border-style: none none solid none;
    }
    tr,
    th,
    td {
      width: 100%;
      color: white;
      font-family: "Archivo";
      font-style: normal;
      font-weight: 500;
      font-size: 18.8116px;
      line-height: 28px;
      /* identical to box height, or 150% */

      display: flex;
      align-items: center;

      color: #ffffff;

      border: 1px solid #000000;
    }
    th,
    td {
      margin: 8px;
    }
    td {
      padding-left: 1px;
    }
    tr:first-of-type {
      border-bottom: 1px solid #828282;
    }
  }
`;
const HbarStyle = styled.td`
  &::after {
    content: "ℏ";
    display: inline;
    position: relative;
    padding-left: 5px;
    font-size: 16px;
  }
`;
const StyledInput = styled.input`
  outline: none;
  background-color: transparent;
  border: 1px solid #828282;
  border-radius: 19px;
  height: 38px;
  font-family: "Archivo";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 28px;
  padding-left: 10px;
  /* identical to box height, or 235% */

  display: flex;
  align-items: center;
  color: #ffffff;
  &:focus {
    outline: none;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const PriceLine = styled.hr`
  border-top: 1px solid #c8f745;
  width: 100%;
`;

const Total = styled.div`
  /* identical to box height, or 235% */

  display: grid;
  padding-top: 8px;

  h1 {
    font-family: "Archivo";
    text-align: right;
    font-style: normal;
    font-weight: 700;
    font-size: 23.5145px;
    /* identical to box height, or 150% */
    color: #ffffff;
  }
  h1::after {
    content: "ℏ";
    display: inline;
    position: relative;
    padding-left: 5px;
    font-size: 16px;
  }
  span {
    font-family: "Archivo";
    text-align: right;
    font-style: italic;
    font-weight: 100;
    font-size: 12px;
    line-height: 20px;

    color: #737373;
  }
`;
const PriceCalculator = ({
  numberQuestions,
  price,
  setPrice,
  exRate,
  setNoOfUsers,
}: {
  numberQuestions?: number;
  price: number;
  setPrice: React.Dispatch<SetStateAction<number>>;
  exRate?: number;
  setNoOfUsers: React.Dispatch<SetStateAction<number>>;
}) => {
  // price calculator table with one row and table header

  const pricePerUser = 10;
  const pricePerquestion = 10;
  const flatSurveyPrice = 30;
  const hederaNetworkTaxes = 50;

  const [users, setUsers] = useState(0);

  useEffect(() => {
    setNoOfUsers(users);

    const totalUsersPrice = users * pricePerUser;

    const calcPrice =
      totalUsersPrice +
      (numberQuestions || 0) * pricePerquestion +
      flatSurveyPrice +
      hederaNetworkTaxes;

    setPrice(calcPrice);
  }, [users]);

  return (
    <div>
      <StyledTable cellSpacing={0}>
        <tbody>
          <tr>
            <th>Define</th>
            <th>Number of questions</th>
            <th>Participant count</th>
            {/* <th>Date Range of survey</th> */}
            <th>Flat survey price</th>
            <th>Hedera network taxes</th>
          </tr>
          <tr>
            <td>Survey details</td>
            <td>{numberQuestions}</td>
            <td>
              <StyledInput
                type="number"
                placeholder="# of participants"
                onChange={(x: any) => setUsers(x.target.value)}
              />
            </td>
            {/* <td>1</td> */}
            <HbarStyle>30</HbarStyle>
            <HbarStyle>50</HbarStyle>
          </tr>
        </tbody>
      </StyledTable>
      <PriceLine />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Total>
          <h1>
            Total: {(price * (exRate || 0)).toFixed(0)}$ = {price}
          </h1>
          <span>to continue press the button at the top</span>
        </Total>
      </div>
    </div>
  );
};

export const CalculatePrice = () => {
  const navigator = useNavigate();
  const ctx = useAppContext();

  const [survey, setSurvey] = useState<TSurveyForm | null>();
  const [price, setPrice] = useState(0);
  const [noOfUsers, setNoOfUsers] = useState(0);

  useEffect(() => {
    const getSurveyIfExists = async () => {
      try {
        const survey = localStorage.getItem("survey");
        const surveyObject = await surveySchema.validate(
          JSON.parse(survey ?? "")
        );
        setSurvey(surveyObject);
      } catch (e) {
        setSurvey(null);
        // if error set survey to null so we don t show the calculator
        // console.log(e);
      }
    };
    getSurveyIfExists();
  }, []);

  const pay = async (users: number) => {
    try {
      // hardcoded for the moment
      const token = await execute(
        "survey",
        survey,
        price.toString(),
        "",
        users
      );
    } catch (e) {
      console.log("ERROR when creating survey", e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 120,
        padding: "0px 82px",
        paddingTop: 150,
      }}
    >
      <TopContainer
        title={"Quote Calculator"}
        TopBar={() => (
          <TopBar
            color="sheetBlue"
            title={"Pay and publish"}
            stepText={"Step 3 of 3"}
            percentage={1}
          />
        )}
        description={
          "Invest in knowledge, shape the future. Decide how many results you will need from your survey and create data encrypted NFT’s for your participants as incentives, motivating them to provide valuable feedback."
        }
        color="yellowGreen"
        textColor="northSeaBlue"
        descriptionColor="sheetBlue"
        button={
          survey
            ? {
                text: "Pay",
                onClick: () => pay(noOfUsers),
              }
            : {
                text: "Go to Upload JSON",
                onClick: () => {
                  navigator("/createSurvey/uploadJson");
                },
              }
        }
      />
      <PriceCalculator
        numberQuestions={survey?.questions?.length ?? 0}
        price={price}
        setPrice={setPrice}
        exRate={ctx?.exRate}
        setNoOfUsers={setNoOfUsers}
      />
    </div>
  );
};
