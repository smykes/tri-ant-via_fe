import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Landing } from "./Pages/Landing/Landing";
import { Entry } from "./Pages/Entry/Entry";
import { Winner } from "./Pages/Winner/Winner";
import { Names } from "./Pages/Names/Names";
import { Month } from "./Pages/Month/Month";
import { Day } from "./Pages/Day/Day";
import { Home } from "./Templates/Home";
import { NotFound } from "./Pages/NotFound/NotFound";
import { DateTime } from "luxon";

const todaysDate = DateTime.now().toFormat("MM'/'dd'/'yyyy");
// const todaysDateYear = todaysDate.getFullYear();
// const todaysDateMonth = todaysDate.getMonth() + 1;
// const todaysDateDay = todaysDate.getDate();
// const route = `day/${todaysDateMonth}/${todaysDateDay}/${todaysDateYear}`;

// const dayRoute = `day/${todaysDate}`;

console.log("route: ", `day/${todaysDate}`);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="entry" element={<Entry />} />
        <Route path="winner/:winner" element={<Winner />} />
        <Route path="names" element={<Names />} />
        <Route path="month/:month/:year" element={<Month />} />
        <Route path="day/:month/:day/:year" element={<Day />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
