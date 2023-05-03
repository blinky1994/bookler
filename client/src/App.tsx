import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FacilitiesPage from "./pages/Facilities/FacilitiesPage";
import { UserContextProvider } from "./context/user.context";
import { MenuContextProvider } from "./context/menu.context";

import {
  BrowserRouter,
  Routes, 
  Route
} from "react-router-dom";

function App() {
  return (
    <UserContextProvider>
      <MenuContextProvider>
        <BrowserRouter>
          <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/facilities/:category_id" element={<FacilitiesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          </div>
        </BrowserRouter>
      </MenuContextProvider>
    </UserContextProvider>
  );
}

export default App;
