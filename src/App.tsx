/* eslint-disable react/jsx-no-undef */
import "./App.css";
import { AppContextProvider } from "./hooks/useAppContext";
import HashVoteRoutes from "./components/HashVoteRoutes";

const App = () => {
  return (
    <div className="app">
      <AppContextProvider>
        <HashVoteRoutes />
      </AppContextProvider>
    </div>
  );
};

export default App;
