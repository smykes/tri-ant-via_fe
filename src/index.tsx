import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Today } from "./Pages/Today/Today";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Entry } from "./Pages/Entry/Entry";
import { List } from "./Pages/List/List";
import { Winner } from "./Pages/Winner/Winner";
import { Names } from "./Pages/Names/Names";
import { Month } from "./Pages/Month/Month";
import { Day } from "./Pages/Day/Day";
import { Home } from "./Templates/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Day />} />
        <Route path="today" element={<Today />} />
        <Route path="login" element={<Login />} />
        <Route path="entry" element={<Entry />} />
        <Route path="list" element={<List />} />
        <Route path="winner/:winner" element={<Winner />} />
        <Route path="names" element={<Names />} />
        <Route path="month/:month/:year" element={<Month />} />
        <Route path="day/:month/:day/:year" element={<Day />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
