import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("ownerToken");

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;