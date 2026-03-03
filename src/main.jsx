/*
  main.jsx - 应用入口文件
  这个文件只做一件事：把 App 组件渲染到页面上
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
