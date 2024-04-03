import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import Header from "./layouts/Header";
import { AppContextProvider } from "./pages/ManagerDashboard/ManagerDashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={configureStore({})}>
    <AppContextProvider>
      {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
        {/* <Header/> */}
      </BrowserRouter>
      {/* </React.StrictMode> */}
    </AppContextProvider>
    {/* test */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
