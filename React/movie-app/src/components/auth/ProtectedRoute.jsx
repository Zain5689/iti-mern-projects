import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
