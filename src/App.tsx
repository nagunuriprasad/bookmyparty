// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Payment from "./Payment";
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Faq from "./Faq";
import PrivacyPolicy from "./PrivacyPolicy";
import Confidentiality from "./Confidentiality";
import ShippingDelivery from "./ShippingDelivery";
import CancelationRefundPolicy from "./CancelationRefundPolicy";
import TermsAndConditions from "./TermsAndConditions";
import HomeSlider from "./HomeSlider";
import StarRating from "./StarRating";
import Packages from "./Packages";
import Travel from "./travel";
import StayingHotel from "./StayingHotel";
import Shop from "./Shop";
import DetailPage from "./DetailPage";
import Staff from "./Staff";
import Navbar from "./Navbar";
import CompanyForm from "./CompanyForm";
import StaffSignup from "./StaffSignup";
import EditStaffProfile from "./editprofile/editstaffprofile";
import EditVendorProfile from "./editprofile/editvendorprofile";
import EditDeliveryProfile from "./editprofile/editdeliveryprofile";
import EditUserProfile from "./editprofile/edituserprofile";
import SignupOptions from "./SignupOptions";
import DeliveryForm from "./DeliveryForm";
import UserForm from "./UserForm";
import FormComponent from "./FormComponent";
import ReviewCarousel from "./reviews/ReviewCarousel";
import Career from "./Bcareer/Career";
import "./Bcareer/Career.css";

import Entertainment from "./Company-Events/src/pages/Entertainment";
import Catering from "./Company-Events/src/pages/Catering";
import Venues from "./Company-Events/src/pages/Venues";
import DJLights from "./Company-Events/src/pages/DJLights";
import PhotoVideo from "./Company-Events/src/pages/PhotoVideo";
import Decoration from "./Company-Events/src/pages/Decoration";

import MyParty from "./MyParty";
import Studio from "./studio";
import FeedbackPage from "./FeedbackPage";
import IdentityCard from "./identitycard";
import StaffDetail from "./StaffDetail";
import InstaDetails from "./InstaDetails";
import ShopDetails from "./ShopDetails";
import CateringPage from "./CateringPage";
import StaffSelectionForm from "./StaffSelectionForm";
import StaffSelection from "./StaffSelection";
import PartyTable from "./PartyTable";
import ShopOrder from "./ShopOrder";
import CartPage from "./CartPage";
import BulkOrder from "./BulkOrder";
import Checkout from "./Checkout";
import VendorDashboard from "./VendorDashboard";
import AdminDashboard from "./admindashboard";
import UserDashboard from "./UserDashboard";
import StaffDashboard from "./StaffDashboard";
import DeliveryDashboard from "./DeliveryDashboard";
import VendorWallet from "./VendorWallet";
import CustomMenu from "./CustomMenu";
import GroceryMenu from "./GroceryMenu";
import RetailShopMenu from "./RetailShopMenu";
import CaterersMenu from "./CaterersMenu";
import ServiceMenu from "./ServiceMenu";
import WorkLogin from './WorkLogin'; 
import CareerPage from './CareerPage';
import FilterForm from './FilterForm';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  // List of pages where header/footer should be hidden
  const isAuthPage =
    [
      "/VendorWallet",
      "/SignupOptions",
      "/StaffSignup",
      "/editstaffprofile",
      "/editvendorprofile",
      "/editdeliveryprofile",
      "/edituserprofile",
      "/DeliveryForm",
      "/UserForm",
      "/FormComponent",
      "/reviews/ReviewCarousel",
      "/Bcareer/Career",
      "/Worklogin",
      "/CustomMenu",
      "/GroceryMenu",
      "/RetailShopMenu",
      "/CaterersMenu",
      "/ServiceMenu",
      "/Company-Events/src/pages/Decoration",
      "/Company-Events/src/pages/Catering",
      "/Company-Events/src/pages/Venues",
      "/Company-Events/src/pages/DJLights",
      "/Company-Events/src/pages/Entertainment",
      "/Company-Events/src/pages/PhotoVideo",
      "/CompanyForm",
    ].includes(location.pathname);

  return (
    <>
      {!isAuthPage && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomeSlider" element={<HomeSlider />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Confidentiality" element={<Confidentiality />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ShippingDelivery" element={<ShippingDelivery />} />
        <Route path="/CancelationRefundPolicy" element={<CancelationRefundPolicy />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/StarRating" element={<StarRating />} />
        <Route path="/Packages" element={<Packages />} />
        <Route path="/StayingHotel" element={<StayingHotel />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Staff" element={<Staff />} />
        <Route path="/CompanyForm" element={<CompanyForm />} />
        <Route path="/StaffSignup" element={<StaffSignup />} />
        <Route path="/editstaffprofile" element={<EditStaffProfile />} />
        <Route path="/editvendorprofile" element={<EditVendorProfile />} />
        <Route path="/editdeliveryprofile" element={<EditDeliveryProfile />} />
        <Route path="/edituserprofile" element={<EditUserProfile />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/DeliveryForm" element={<DeliveryForm />} />
        <Route path="/SignupOptions" element={<SignupOptions />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/reviews/ReviewCarousel" element={<ReviewCarousel />} />
        <Route path="/FormComponent" element={<FormComponent />} />
        <Route path="/Bcareer/Career" element={<Career />} />
        <Route path="/Company-Events/src/pages/Entertainment" element={<Entertainment />} />
        <Route path="/Company-Events/src/pages/Catering" element={<Catering />} />
        <Route path="/Company-Events/src/pages/Venues" element={<Venues />} />
        <Route path="/Company-Events/src/pages/DJLights" element={<DJLights />} />
        <Route path="/Company-Events/src/pages/PhotoVideo" element={<PhotoVideo />} />
        <Route path="/Company-Events/src/pages/Decoration" element={<Decoration />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        <Route path="/myparty" element={<MyParty />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/FeedbackPage" element={<FeedbackPage />} />
        <Route path="/identitycard" element={<IdentityCard />} />
        <Route path="/StaffDetail" element={<StaffDetail />} />
        <Route path="/InstaDetails" element={<InstaDetails />} />
        <Route path="/ShopDetails" element={<ShopDetails />} />
        <Route path="/CateringPage" element={<CateringPage />} />
        <Route path="/StaffSelectionForm" element={<StaffSelectionForm />} />
        <Route path="/StaffSelection" element={<StaffSelection />} />
        <Route path="/PartyTable" element={<PartyTable />} />
        <Route path="/ShopOrder" element={<ShopOrder />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/BulkOrder" element={<BulkOrder />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/VendorDashboard" element={<VendorDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard/>} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/StaffDashboard" element={<StaffDashboard />} />
        <Route path="/DeliveryDashboard" element={<DeliveryDashboard />} />
        <Route path="/CustomMenu" element={<CustomMenu />} />
        <Route path="/GroceryMenu" element={<GroceryMenu />} />
        <Route path="/RetailShopMenu" element={<RetailShopMenu />} />
        <Route path="/CaterersMenu" element={<CaterersMenu />} />
        <Route path="/ServiceMenu" element={<ServiceMenu />} />
        <Route path="/WorkLogin" element={<WorkLogin />} />
        <Route path="/CareerPage" element={<CareerPage />} />
        <Route path="/FilterForm" element={<FilterForm />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
