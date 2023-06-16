/* eslint-disable react/jsx-no-undef */
import "./App.css";
import { AppContextProvider } from "./hooks/useAppContext";
import HashChangeRoutes from "./components/HashChangeRoutes";

const App = () => {
  return (
      <div className="app">
        <AppContextProvider>
          <HashChangeRoutes />
        </AppContextProvider>
      </div>
  );
};

export default App;
