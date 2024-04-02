import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Search } from "./Pages/Search/Search";
import { Landing } from "./Pages/Landing/Landing";
import { Entry } from "./Pages/Entry/Entry";
import { Winner } from "./Pages/Winner/Winner";
import { Month } from "./Pages/Month/Month";
import Day from "./Pages/Day/Day";
import Names from "./Pages/Names/Names";

import { Home } from "./Templates/Home";
import { NotFound } from "./Pages/NotFound/NotFound";
import { ProtectedRoute } from "./Components/ProtectedRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Landing />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route
          path="entry"
          element={
            <ProtectedRoute>
              <Entry />
            </ProtectedRoute>
          }
        />
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
