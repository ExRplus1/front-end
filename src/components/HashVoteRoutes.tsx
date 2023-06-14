import { Routes, Route } from "react-router-dom";
import Layout from "../containers/Layout";
import { Landing } from "../pages/Landing";
import { SurveySteps } from "../pages/SurveySteps";
import { SelectSurvey } from "../pages/SelectSurvey";
import { SurveyPay } from "../pages/SurveyPay";
import { StartSurvey } from '../pages/StartSurvey'

const HashVoteRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="/respond-survey" element={<SurveySteps />} />
      <Route path="/respond-survey/select-survey" element={<SelectSurvey />} />
      <Route path="/respond-survey/pay/:surveyId" element={<SurveyPay />} />
      <Route path="/respond-survey/start-survey/:surveyId" element={<StartSurvey />} />
    </Route>
  </Routes>
);

export default HashVoteRoutes;