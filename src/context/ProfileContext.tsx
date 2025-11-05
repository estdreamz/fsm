import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface MenuChildren {
  id: number;
  name: string;
  icon?: string | null;
  url: string;
  priority: number;
}

interface Menu {
  id: number;
  name: string;
  icon: string;
  url: string;
  priority: number;
  children: MenuChildren[];
}

interface Profile {
  id: number;
  code?: string | null;
  email: string;
  mobile?: string | null;
  prefix_id?: string | null;
  prefix_name?: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  photo: string | null;
  role_level: string;
  role_id: number;
  role_name: string;
  org_id?: string | null;
  org_name?: string | null;
  org_status?: string | null;
  status: number;
  last_login: string;
  menus: Menu[];
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<Profile | null>(null);

  // Load profile from localStorage on mount
  useEffect(() => {
    console.log("ProfileProvider - Loading profile from localStorage...");
    try {
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        console.log("ProfileProvider - Profile loaded:", parsedProfile.full_name);
        setProfileState(parsedProfile);
      } else {
        console.log("ProfileProvider - No profile in localStorage");
      }
    } catch (error) {
      console.error("ProfileProvider - Failed to load profile from localStorage:", error);
    }
  }, []);

  // Save profile to localStorage whenever it changes
  const setProfile = (newProfile: Profile | null) => {
    console.log("ProfileProvider - Setting profile:", newProfile?.full_name || "null");
    setProfileState(newProfile);
    if (newProfile) {
      try {
        localStorage.setItem("userProfile", JSON.stringify(newProfile));
        console.log("ProfileProvider - Profile saved to localStorage");
      } catch (error) {
        console.error("ProfileProvider - Failed to save profile to localStorage:", error);
      }
    } else {
      localStorage.removeItem("userProfile");
      console.log("ProfileProvider - Profile removed from localStorage");
    }
  };

  const clearProfile = () => {
    console.log("ProfileProvider - Clearing profile");
    setProfileState(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
