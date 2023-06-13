import { Routes, Route } from "react-router-dom";
import Layout from "../containers/Layout";
import { Landing } from "../pages/Landing";

const HashVoteRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Landing />} />
    </Route>
  </Routes>
);

export default HashVoteRoutes;