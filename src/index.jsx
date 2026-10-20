import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Убедитесь, что путь и расширение верные
import "./index.css"; // Если есть стили

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
