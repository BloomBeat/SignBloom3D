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
import DisplayVocab from "../pages/displayvocab/DisplayvocabPage.jsx";
// Will create all page below after get UI
// import { Support } from "../pages/support/SupportPage.jsx";
// import { AboutUs } from "../pages/aboutus/AboutUsPage.jsx";
// import { Register } from "../pages/register/RegisterPage.jsx";
// import { Login } from "../pages/login/LoginPage.jsx";


export const Router = () => (
  <>
  <Routes>
    <Route
      path={RoutePaths.HOME} // URL to the home page
      element={
        // What will be rendered
        <Layout>
          <Navbaruser/>
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
          <Navbaruser/>
          <AdminTicketPage/>
        </Layout>
      }
    />
    <Route
      //
      path={RoutePaths.DISPLAYVOCAB} // URL to the home page
      element={
        // What will be rendered
        <Layout>
          <Navbaruser/>
          <DisplayVocab/>
        </Layout>
      }
    />
    <Route
      path="*" // localhost:5173/3D 
      element={
        <Layout>
          <Navbaruser/>
          <NotFound />
        </Layout>
      }
    /> 
    <Route
      path={RoutePaths.VOCAB} // localhost:5173/vocabulary
      element={
        <Layout>
          <Navbaruser/>
          <Vocabulary/>
        </Layout>
      }
    />

    {/* <Route
      path="support" // localhost:5173/support
      element={
        <Layout>
          <Navbaruser/>
          <Support/>
        </Layout>
      }
    /> 
    <Route
      path="aboutus" // localhost:5173/aboutus
      element={
        <Layout>
          <Navbaruser/>
          <AboutUs/>
        </Layout>
      }
    />
    <Route
      path="register" // localhost:5173/register
      element={
        <Layout>
          <Navbaruser/>
          <Register/>
        </Layout>
      }
    />
    <Route
      path="login" // localhost:5173/login
      element={
        <Layout>
          <Navbaruser/>
          <Login/>
        </Layout>
      }
    /> */}
  </Routes>
  </>
);
