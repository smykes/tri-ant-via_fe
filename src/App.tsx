import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login/Login";
import { Winners } from "./Pages/Winners/Winners";

const App = () => {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Winners />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>;
};

export default App;
