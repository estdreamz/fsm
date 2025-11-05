import { Route } from "react-router";
import { useProfile } from "../../context/ProfileContext";
import Blank from "../../pages/Blank";
import Home from "../../pages/Dashboard/Home";
import Page1 from "../../pages/page1";
import Page2 from "../../pages/page2";
import Page3 from "../../pages/page3";
import Page4 from "../../pages/page4";

// Map of available pages
const pageComponents: { [key: string]: React.ComponentType } = {
  "/dashboard": Home,
  "/dashboard/pages1": Page1,
  "/dashboard/pages2": Page2,
  "/dashboard/pages3": Page3,
  "/dashboard/pages4": Page4,
  // Add more mappings as needed
};

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

export const DynamicRoutes = () => {
  const { profile } = useProfile();

  if (!profile || !profile.menus) {
    return null;
  }

  return (
    <>
      {profile.menus.map((menu: Menu) => {
        // If menu has children, create routes for them
        if (menu.children && menu.children.length > 0) {
          return menu.children.map((child: MenuChildren) => {
            const path = child.url.replace("/dashboard/", "");
            const Component = pageComponents[child.url] || Blank;
            return (
              <Route
                key={child.id}
                path={path}
                element={<Component />}
              />
            );
          });
        }

        // Create route for parent menu
        const path = menu.url === "/dashboard" ? "" : menu.url.replace("/dashboard/", "");
        const Component = pageComponents[menu.url] || Blank;
        return (
          <Route
            key={menu.id}
            path={path || undefined}
            element={<Component />}
          />
        );
      })}
    </>
  );
};
