import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
    <ToastContainer />

  </StrictMode>,
  rootElement
);