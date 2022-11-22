import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteSignIn from "./components/PrivateRouteSignIn";
import Explore from "./pages/Explore";
import Category from "./pages/Category";
import Content from "./pages/Content";
import Create from "./pages/Create";
import ForgotPassword from "./pages/ForgotPassword";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="" element={<Explore />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path='/category/:categoryName/:listingId' element={<Listing />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<PrivateRouteSignIn />}>
            <Route path="/sign-in" element={<SignIn />} />
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create" element={<Create />} />
          <Route path="/content" element={<Content />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
