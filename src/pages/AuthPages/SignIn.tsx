import { useEffect } from "react";
import { useNavigate } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";
import { Auth } from "../../utils/rest";
import { useProfile } from "../../context/ProfileContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setProfile } = useProfile();

  useEffect(() => {
    // Initialize token on first page load (non-blocking)
    const initializeToken = async () => {
      try {
        console.log("Initializing token...");
        await Auth.initToken();
        console.log("Token initialized successfully");
      } catch (error) {
        console.error("Failed to initialize token:", error);
        // Don't block rendering even if token fails
      }
    };
    
    initializeToken();
  }, []);

  const handleSubmitSuccess = (profile: any) => {
    // Handle successful sign in - navigate to dashboard
    console.log("Sign in successful", profile);
    // Store profile in context
    setProfile(profile);
    console.log("Profile set in context, navigating to dashboard...");
    
    // Use setTimeout to ensure profile is set before navigation
    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 100);
  };

  return (
    <>
      <PageMeta
        title="FMS.ZONE"
        description="This is FMS Platform"
      />
      <AuthLayout>
        <SignInForm handleSubmitSuccess={handleSubmitSuccess} />
      </AuthLayout>
    </>
  );
}
