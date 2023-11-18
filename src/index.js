import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/sw.js") // Adjust the path based on your project structure
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker.register("/sw.js").then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     });
//   });
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
