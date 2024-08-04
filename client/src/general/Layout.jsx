/**
 * This function is a layout component that wraps its children with an ErrorBoundary.
 * The ErrorBoundary catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 *
 * @param {Object} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the ErrorBoundary.
 *
 * @returns {React.ReactElement} - The wrapped child components with an ErrorBoundary.
 */

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../components/ErrorFallback.jsx";

export const Layout = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

