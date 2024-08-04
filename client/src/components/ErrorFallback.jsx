/**
 * ErrorFallback is a React component that handles error boundaries in an application.
 * It displays a custom error message and provides options to navigate to the home page or try again.
 *
 * @param {Object} props - The component's props.
 * @param {Error} props.error - The error that occurred.
 * @param {Function} props.resetErrorBoundary - A function to reset the error boundary.
 *
 * @returns {JSX.Element} - The rendered error fallback component.
 */

import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../general/RoutePaths.jsx";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  return (
    <div role="alert">
      {import.meta.env.DEV && (
        <div className="bg-white pl-10 pt-10">
          <p>DEV ONLY!</p>
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      <div className="mb-4 mt-16 flex w-full flex-col items-center justify-center space-y-16">
        <div>
          <a
            onClick={() => {
              resetErrorBoundary();
              navigate(RoutePaths.HOME);
            }}
          >
            Home
          </a>
        </div>
        <div>An error happened. Contact support please!</div>
      </div>
    </div>
  );
};
