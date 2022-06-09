import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Custom from "./Custom";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import Auth0Config from "./auth0.config";
// import { createBrowserHistory } from "history";

// const history = createBrowserHistory();
// const onRedirectCallback = (appState) => {
//   history.push(
//     appState && appState.returnTo ? appState.returnTo : window.location.pathname
//   );
// };
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={Auth0Config.domain}
      clientId={Auth0Config.clientId}
      redirectUri={window.location.origin}
      // onRedirectCallback={onRedirectCallback}
    >
      <Custom />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
