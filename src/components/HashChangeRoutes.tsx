import {
  Routes,
  Route
} from "react-router-dom";
import Layout from "../containers/Layout";
import {
  Landing,
  SurveySteps,
  SelectSurvey,
  StartSurvey,
  EndSurvey,
  CreateSurveyPage,
  CalculatePrice,
  UploadJson,
  MySurveys,
  MyAnswers,
  SurveysResponsesGraph
} from "../pages";

const HashChangeRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="/respond-survey" element={<SurveySteps />} />
      <Route path="/respond-survey/select-survey" element={<SelectSurvey />} />
      <Route path="/respond-survey/start-survey/:surveyId" element={<StartSurvey />} />
      <Route path="/respond-survey/end/:surveyId" element={<EndSurvey />} />
      <Route path="/createSurvey/start" element={<CreateSurveyPage />} />
      <Route path="/createSurvey/calculatePrice" element={<CalculatePrice />} />
      <Route path="/createSurvey/uploadJson" element={<UploadJson />} />
      <Route path="/my-surveys" element={<MySurveys />} />
      <Route path="/my-answers" element={<MyAnswers />} />
      <Route path="/my-surveys/:survey-id" element={<SurveysResponsesGraph />} />
    </Route>
  </Routes>
);

export default HashChangeRoutes;