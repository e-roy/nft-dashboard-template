import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId={process.env.REACT_APP_MORALIS_APPLICATION_ID}
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
