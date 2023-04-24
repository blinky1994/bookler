import './App.scss';
import NavBar from './components/./NavBar/NavBar';
import FacilitiesSection from './components/FacilitiesSection/FacilitiesSection';
import SideMenu from './components/SideMenu/SideMenu';

function App() {
  return (
    <div className="app">
      <SideMenu />
      <NavBar />
      <FacilitiesSection />
    </div>
  );
}

export default App;
