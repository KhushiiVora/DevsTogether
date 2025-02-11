import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
  if (!user) {
    return Navigate("/login");
  }
  return children;
}

export default ProtectedRoute;
