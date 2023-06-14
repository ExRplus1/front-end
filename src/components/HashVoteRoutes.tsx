import { Routes, Route } from "react-router-dom";
import Layout from "../containers/Layout";
import { Landing } from "../pages/Landing";
import { SurveySteps } from "../pages/SurveySteps";
import { SelectSurvey } from "../pages/SelectSurvey";

const HashVoteRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
      <Route path="/respond-survey" element={<SurveySteps />} />
      <Route path="/respond-survey/select-survey" element={<SelectSurvey />} />
    </Route>
  </Routes>
);

export default HashVoteRoutes;