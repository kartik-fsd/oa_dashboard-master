import React, { createContext } from "react";
import Route from "./routes";

import "./assets/scss/themes.scss";

import "./App.css";
import { contextData } from "./statesInitializer";
import { ToastContainer } from "react-toastify";

export const Context = createContext();

function App() {
  const [context, setContext] = React.useState({ ...contextData });

  return (
    <Context.Provider value={[context, setContext]}>
      <React.Fragment>
        <ToastContainer />
        <Route />
      </React.Fragment>
    </Context.Provider>
  );
}

export default App;
