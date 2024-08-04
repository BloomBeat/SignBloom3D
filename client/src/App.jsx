import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./general/Router.jsx";
import { Loading } from "./components/Loading.jsx";

/**
 * This is a component that wraps its children with a header.
 *
 * @param {Object} props - The component's props.
 * @param {JSX.Element} props.children - The children to be wrapped with the header.
 *
 * @returns {JSX.Element} The component with the header.
 */

export const PageWithHeader = ({ children }) => (
  <div className="flex h-full flex-col">{children}</div>
);

/**
 * This is the main application component that wraps the entire application.
 * It uses React Router to handle navigation and Suspense for code splitting.
 *
 * @returns {JSX.Element} The main application component.
 */

export const App = () => (
  <BrowserRouter>
    <Suspense
      fallback={
        <PageWithHeader>
          <Loading name="suspense" />
        </PageWithHeader>
      }
    >
      <div className="h-full bg-white">
        <Router />
      </div>
    </Suspense>
  </BrowserRouter>
);
