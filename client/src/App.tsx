import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

import {
  BrowserRouter,
  Routes, 
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
