import { useNavigate } from "react-router-dom";
import { SurveyCard } from "./SelectSurvey"
import { useEffect, useState } from "react";
import { getSurveys } from "../services/utils";

export const MySurveys = () => {
    const navigate = useNavigate();

  const [surveys, setSurveys] = useState([{
    id: "",
    title: "",
    description: "",
    type: "",
    organization: "",
    color: "",
  }]);

    useEffect(() => {
      (async () => {
        try {
          const s = await getSurveys();
          // here we should query IPFS for the survey props
          s.foreach((_s:any) => {
            setSurveys([{
              id: _s[0],
              title: "Climate Change",
              description: "How do you feel about healthcare?",
              type: "Climate",
              organization: "UN",
              color: "electricUltramarine",
            }]);
          })
        } catch (e) {
          console.log(e);
        }
      })();
    }, []);
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(4, 1fr)`,
            gap: 38
        }}>
            {
                surveys.map(
                    (survey) => <SurveyCard
                        onClick={() => { navigate(`/my-surveys/graph/${survey.id}`) }}
                        key={survey.id}
                        {...survey}
                    />
                )
            }
        </div>
    )
}
