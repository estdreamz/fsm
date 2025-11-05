import { Outlet, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { Auth } from "../utils/rest";
import { useProfile } from "../context/ProfileContext";

/**
 * GuestLayout - Layout for non-authenticated users
 * If user is already logged in, redirect to dashboard
 */
const GuestLayout: React.FC = () => {
  const [isChecking, setIsChecking] = useState(true);
  const { profile } = useProfile();

  useEffect(() => {
    console.log("GuestLayout - Starting auth check");
    
    // Wait a bit for ProfileProvider to load from localStorage
    setTimeout(() => {
      const cookie = Auth.getCookie();
      console.log("GuestLayout - Cookie:", cookie);
      console.log("GuestLayout - Profile:", profile);
      setIsChecking(false);
    }, 100);
  }, [profile]);

  if (isChecking) {
    console.log("GuestLayout - Checking...");
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  // If authenticated, redirect to dashboard
  const cookie = Auth.getCookie();
  const isAuthenticated = cookie?.auth && profile;

  if (isAuthenticated) {
    console.log("GuestLayout - User authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  console.log("GuestLayout - Showing guest content");
  return <Outlet />;
};

export default GuestLayout;
