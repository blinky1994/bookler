import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import FacilitiesPage from "./pages/FacilitiesPage/FacilitiesPage";
import FacilityPage from "./pages/FacilityPage/FacilityPage";
import { UserContextProvider } from "./context/user.context";
import { MenuContextProvider } from "./context/menu.context";
import BookingsPage from "./pages/BookingsPage/BookingsPage";
import SideMenuDesktop from "./components/SideMenu/SideMenuDesktop/SideMenuDesktop";
import styles from './App.module.scss';

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
          <div className={styles.desktopLayout}>
            <SideMenuDesktop />
          <div className={styles.body}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/facilities/:category_id" element={<FacilitiesPage />} />
              <Route path="/facilities/facility/:facility_id" element={<FacilityPage />} />

              <Route path="/bookings" element={<BookingsPage />} />


            </Routes>
          </div>
          </div>
          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
      </MenuContextProvider>
    </UserContextProvider>
  );
}

export default App;
