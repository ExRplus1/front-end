import { useNavigate } from "react-router-dom";
import { SurveyCard, surveys } from "./SelectSurvey"

export const MySurveys = () => {
    const navigate = useNavigate();
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
