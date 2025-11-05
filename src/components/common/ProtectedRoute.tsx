import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import { Auth } from "../../utils/rest";
import { useProfile } from "../../context/ProfileContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { profile } = useProfile();

  useEffect(() => {
    const checkAuth = () => {
      console.log("ProtectedRoute - Checking auth...");
      
      // Check if cookie exists
      const cookie = Auth.getCookie();
      console.log("ProtectedRoute - Cookie:", cookie);
      console.log("ProtectedRoute - Profile:", profile);
      
      // Simple check: if we have both cookie.auth and profile, we're good
      if (cookie?.auth && profile) {
        console.log("ProtectedRoute - Authenticated!");
      } else if (!cookie?.auth) {
        console.log("ProtectedRoute - No valid cookie");
      } else if (!profile) {
        console.log("ProtectedRoute - No profile in context");
      }
      
      setIsChecking(false);
    };

    // Wait a bit for ProfileProvider to load from localStorage
    setTimeout(checkAuth, 100);
  }, [profile]);

  if (isChecking) {
    console.log("ProtectedRoute - Checking...");
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  const cookie = Auth.getCookie();
  const isAuthenticated = cookie?.auth && profile;

  if (!isAuthenticated) {
    console.log("ProtectedRoute - Redirecting to signin");
    return <Navigate to="/signin" replace />;
  }

  console.log("ProtectedRoute - Rendering protected content");
  return <>{children}</>;
};
