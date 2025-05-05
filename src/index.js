import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import GulliHome from "./pages/GulliHome";
import ErrorCom from "./Components/ErrorCom";
import Product from './pages/Product';
import AboutUs from "./pages/AboutUS";
import ContactUs from "./pages/ContactUs";
// import TDLManagement from './Components/TdlManagement';
import Tdl from './pages/ServicesTdl';
// import Rank from "./pages/Rank";
// import Cashout from "./pages/CashOut";
import { AuthContextProvider } from "./context/AuthContext";


import NotAdmin236 from "./pages/NotAdmin236";
// import EditPay from "./pages/EditPay";

import Dashboard from "./pages/admin/Dashboard";
import Statistics from "./pages/admin/Statistics";
import TdlManagerAdmin from "./pages/admin/tdlManagerAdmin";
import ProductManager from './pages/admin/ProductManager';
import Ezobilling from './pages/EzoBilling';
import TrainingLearning from './pages/TrainingLearning';
import TSSFeatures from './pages/TSSFeatures';
import TallyCustomization from './pages/TallyCustomization';
import BillingPage from './pages/BillingPage';
import EnquaryManager from './pages/admin/EnquaryManager';
import AdmissionTraning from './pages/admin/AdmissionTranning';
import TallyCustum from './pages/admin/TallyCustum';
import CompanyProfile from './pages/admin/CompanyProfile';
import SalesDashboard from './pages/admin/SalesDashboard';

// import Settings from "./pages/admin/Settings";
// import EditTasks from "./pages/admin/EditTasks";
// import ExtrenalTasks from "./pages/admin/ExtrenalTasks";
// import AdminAdvertTasks from "./pages/admin/AdminAdvertTasks";
// import AdminYoutube from "./pages/admin/AdminYoutube";
// // import AirdropWallets from "./pages/admin/AdminWallets";
// import AdminRanks from "./pages/admin/AdminRanks";
// import Search from "./pages/admin/Search";
// import Adminpayout from './pages/admin/Adminpayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorCom />,
    children: [
      { path: "/", element: <GulliHome /> },
      { path: "product/tally-prime", element: <Product /> },
      { path: "/billing-info", element: <BillingPage/> },
      { path: "product/ezo-billing", element: <Ezobilling/> },
      { path: "services/training-learning", element: <TrainingLearning/> },
      { path: "services/tss", element: <TSSFeatures/> },
      { path: "services/tally-customization", element: <TallyCustomization/> },
      // { path: "rank", element: <Rank /> },
      // { path: "cashout", element: <Cashout /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <ContactUs /> },
      { path: "dashboardlogin", element: <NotAdmin236 /> },
      { path: "services/tdl", element: <Tdl /> },
    ],
  },
  {
    path: "/dashboardAdx",
    element: <Dashboard />,
    errorElement: <ErrorCom />,
    children: [
      //     { path: "settings", element: <Settings /> },
      //     { path: "managetasks", element: <EditTasks /> },
      { path: "productmanager", element: <ProductManager /> },
      { path: "tdl", element: <TdlManagerAdmin /> },
          { path: "sales-dashboard", element: <SalesDashboard/>},
          { path: "tally-custum", element: <TallyCustum/> },
          { path: "enquary-manager", element: <EnquaryManager/> },
          { path: "admission-tranning", element: <AdmissionTraning/> },
          { path: "company-profile", element: <CompanyProfile/> },
      //     { path: "search", element: <Search /> },
      { path: "stats", element: <Statistics /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </AuthContextProvider>
);
