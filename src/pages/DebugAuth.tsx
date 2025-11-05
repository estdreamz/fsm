import { Auth } from "../utils/rest";
import { useProfile } from "../context/ProfileContext";
import { deleteCookie } from "cookies-next";
import { Config } from "../config";

export default function DebugAuth() {
  const { profile } = useProfile();
  const cookie = Auth.getCookie();

  const handleClearCookie = () => {
    deleteCookie(Config.COOKIE_NAME);
    localStorage.removeItem("userProfile");
    window.location.href = "/signin";
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Debug Authentication</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Cookie Status:</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-2">
          {JSON.stringify(cookie, null, 2) || "No cookie found"}
        </pre>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Profile Status:</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-2">
          {JSON.stringify(profile, null, 2) || "No profile found"}
        </pre>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">localStorage:</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded mt-2">
          {localStorage.getItem("userProfile") || "No profile in localStorage"}
        </pre>
      </div>

      <button
        onClick={handleClearCookie}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Clear All Auth Data & Reload
      </button>
    </div>
  );
}
