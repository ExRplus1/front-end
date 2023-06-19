import {
  Routes,
  Route
} from "react-router-dom";
import Layout from "../containers/Layout";
import {
  Landing,
  SurveySteps,
  SelectSurvey,
  SurveyPay,
  StartSurvey,
  EndSurvey,
  CreateSurveyPage,
  CalculatePrice,
  UploadJson
} from "../pages";

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
      <Route path="/createSurvey/uploadJson" element={<UploadJson />} />

    </Route>
  </Routes>
);

export default HashChangeRoutes;