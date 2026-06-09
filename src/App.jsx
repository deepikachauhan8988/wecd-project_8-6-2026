import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import Home from './components/pages/Home';
import { AuthProvider, useAuth } from './components/all_login/AuthContext';
import SectorDashBoard from "./components/sector_panel/SectorDashBoard";
import NavBar from './components/nav_bar/NavBar';
import Login from "./components/all_login/Login";
import SectorProfile from "./components/sector_panel/SectorProfile";
import OurAwc from "./components/sector_panel/OurAwc";
import MahalakshmiKit from "./components/sector_panel/Stock_manager_distribution/MahalakshmiKit";
import DemandanchalAamrit from "./components/sector_panel/demand/DemandanchalAamrit";
import DemandPoshanFinal from "./components/sector_panel/demand/DemandPoshanFinal";
import DemandBalPoshan from "./components/sector_panel/demand/DemandBalPoshan";
import DistributionMahilaPoshFinal from "./components/sector_panel/Stock_manager_distribution/DistributionMahilaPoshFinal";
import DistributionBalPoshan from "./components/sector_panel/Stock_manager_distribution/DistributionBalPoshan";
import DPODashboard from "./components/DPO_panel/DPODashboard";

import CDPODashboard from "./components/CDPO_panel/CDPODashboard";
import DirectorDashboard from "./components/director_panel/DirectorDashboard";
import Footer from "./components/footer/Footer";



//  Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isReady } = useAuth();
  const location = useLocation();

  // While checking auth state, show nothing (prevents flash of wrong content)
  if (!isReady) {
    return null;
  }

  // If not authenticated, redirect to login (with return URL)
  if (!isAuthenticated) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
};

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = ["/SectorDashBoard", "/SectorProfile", "/OurAwc", "/MahalakshmiKit", "/DemandanchalAamrit", "/DemandPoshanFinal", "/DemandBalPoshan", "/DistributionMahilaPoshFinal", "/DistributionBalPoshan", "/DPODashboard",  "/CDPODashboard", "/DirectorDashboard"];
  const hideFooterRoutes = ["/SectorDashBoard", "/SectorProfile", "/OurAwc", "/MahalakshmiKit", "/DemandanchalAamrit", "/DemandPoshanFinal", "/DemandBalPoshan", "/DistributionMahilaPoshFinal", "/DistributionBalPoshan", "/DPODashboard",  "/CDPODashboard", "/DirectorDashboard"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SectorDashBoard" element={<SectorDashBoard />} />
           <Route path="/SectorProfile" element={<SectorProfile />} />
           <Route path="/OurAwc" element={<OurAwc />} />
           <Route path="/MahalakshmiKit" element={<MahalakshmiKit />} />
           <Route path="/DemandanchalAamrit" element={<DemandanchalAamrit />} />
           <Route path="/DemandPoshanFinal" element={<DemandPoshanFinal />} />
           <Route path="/DemandBalPoshan" element={<DemandBalPoshan />} />
           <Route path="/DistributionMahilaPoshFinal" element={<DistributionMahilaPoshFinal />} />
           <Route path="/DistributionBalPoshan" element={<DistributionBalPoshan />} />
          <Route path="/DPODashboard" element={<DPODashboard />} />
          <Route path="/DPODashboard" element={<DPODashboard />} />
          <Route path="/CDPODashboard" element={<CDPODashboard />} />
          <Route path="/DirectorDashboard" element={<DirectorDashboard />} />
          {/* <Route path="/SectorDashBoard" element={
            <ProtectedRoute>
              <SupervisorDashBoard />
            </ProtectedRoute>
          } /> */}
          {/* <Route path="/DPODashboard" element={
            <ProtectedRoute>
              <DPODashboard />
            </ProtectedRoute>
          } /> */}
         
          {/* <Route path="/CDPODashboard" element={
            <ProtectedRoute>
              <CDPODashboard />
            </ProtectedRoute>
          } /> */}
          {/* <Route path="/DirectorDashboard" element={
            <ProtectedRoute>
              <DirectorDashboard />
            </ProtectedRoute>
          } /> */}
           
          <Route path="/Login" element={<Login />} />
  
         
          
        </Routes>
        {!shouldHideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
