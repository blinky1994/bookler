import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { UserContextProvider } from "./context/user.context";
import { MenuContextProvider } from "./context/menu.context";
import { CategoriesContextProvider } from "./context/categories.context";

import {
  BrowserRouter,
  Routes, 
  Route
} from "react-router-dom";

function App() {
  return (
    <UserContextProvider>
      <MenuContextProvider>
        <CategoriesContextProvider>
        <BrowserRouter>
          <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          </div>
        </BrowserRouter>
        </CategoriesContextProvider>
      </MenuContextProvider>
    </UserContextProvider>
  );
}

export default App;
