/**
 * A function that returns a React Router component with routes for the home page and a 404 not found page.
 * The routes are wrapped within a Layout component for consistent styling and navigation.
 *
 * @returns {JSX.Element} - A React Router component with routes for the home page and a 404 not found page.
 */

import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths.jsx";
import { HomePage } from "../pages/home/HomePage.jsx";
import { NotFound } from "./NotFound.jsx";
import { Layout } from "./Layout.jsx";
import Navbaruser from "../components/Navbaruser.jsx";
import { Vocabulary } from "../pages/vocabulary/VocabularyPage.jsx";
import { AdminTicketPage } from "../pages/admin/AdminTicketPage.jsx"
import { Login } from "../pages/login/Login.jsx"
import {Toaster} from "react-hot-toast"
import { Navigate } from "react-router-dom";
// Will create all page below after get UI
// import { Support } from "../pages/support/SupportPage.jsx";
// import { AboutUs } from "../pages/aboutus/AboutUsPage.jsx";
// import { Register } from "../pages/register/RegisterPage.jsx";
// import { Login } from "../pages/login/LoginPage.jsx";

function getCookie(name) {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
  }, {});

  return cookies[name];
}

const userToken = getCookie("SessionID");

export const Router = () => (
  <>
  <Routes>
    <Route
      path={RoutePaths.HOME} // URL to the home page
      element={
        // What will be rendered
        <Layout>
          <Navbaruser userToken={userToken}/>
          <HomePage />
        </Layout>
      }
    />
    <Route
      //
      path={RoutePaths.ADMINTICKET} // URL to the home page
      element={
        // What will be rendered
        <Layout>
          <Navbaruser userToken={userToken}/>
          <AdminTicketPage/>
        </Layout>
      }
    />
    <Route
      path="*" // localhost:5173/3D 
      element={
        <Layout>
          <Navbaruser userToken={userToken}/>
          <NotFound />
        </Layout>
      }
    /> 
    <Route
      path={RoutePaths.VOCAB} // localhost:5173/vocabulary
      element={
        <Layout>
          <Navbaruser userToken={userToken}/>
          <Vocabulary/>
        </Layout>
      }
    />

    {/* <Route
      path="support" // localhost:5173/support
      element={
        <Layout>
          <Navbaruser userToken={userToken}/>
          <Support/>
        </Layout>
      }
    /> 
    <Route
      path="aboutus" // localhost:5173/aboutus
      element={
        <Layout>
          <Navbaruser userToken={userToken}/>
          <AboutUs/>
        </Layout>
      }
    />
    <Route
      path="register" // localhost:5173/register
      element={
        <Layout>
          <Navbaruser userToken={userToken}/>
          <Register/>
        </Layout>
      }
    /> */}
    <Route
      path={RoutePaths.LOGIN} // localhost:5173/login
      element={!userToken ? 
        <Layout>
          <Navbaruser userToken={userToken}/>
          <Login/>
        </Layout>
        : <Navigate to={"/"} />
      }
    />
  </Routes>
  <Toaster
  position="bottom-center"
  reverseOrder={true}
/>
  </>
);
