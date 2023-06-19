import { Routes, Route } from "react-router-dom";
import Layout from "../containers/Layout";
import { Landing } from "../pages/Landing";
import { SurveySteps } from "../pages/SurveySteps";
import { SelectSurvey } from "../pages/SelectSurvey";
import { SurveyPay } from "../pages/SurveyPay";
import { StartSurvey } from '../pages/StartSurvey'
import { EndSurvey } from '../pages/EndSurvey'
import { CreateSurveyPage } from "../pages/CreateSurveyPage";
import { CalculatePrice } from "../pages/CalculatePrice";

const HashChangeRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="/respond-survey" element={<SurveySteps />} />
      <Route path="/respond-survey/select-survey" element={<SelectSurvey />} />
      <Route path="/respond-survey/pay/:surveyId" element={<SurveyPay />} />
      <Route path="/respond-survey/start-survey/:surveyId" element={<StartSurvey />} />
      <Route path="/respond-survey/end/:surveyId" element={<EndSurvey />} />
      <Route path="/createSurvey/start" element={<CreateSurveyPage />} />
      <Route path="/createSurvey/calculatePrice" element={<CalculatePrice />} />

    </Route>
  </Routes>
);

export default HashChangeRoutes;