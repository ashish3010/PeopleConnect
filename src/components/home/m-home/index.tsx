import React, { useState, useEffect, useRef } from "react";
import HomeDashboard from "./home-dashboard";
import Groups from "./groups";
import AboutMe from "./about-me";
import Help from "./help";
import useDashboard from "@/src/hooks/useDashboard/useDashboard";
import CentralLoader from "../../common/Central-loader";
import ErrorComponent from "../../common/Error";
import { ApiError } from "@/src/network";
import { useQueryClient } from "@tanstack/react-query";
import { Group } from "@/src/hooks/useDashboard/types";

type MenuType = "home" | "groups" | "about-me" | "help";

const menuOrder: MenuType[] = ["home", "groups", "about-me", "help"];

const MobileHome = () => {
  const { dashboardData, isDashboardLoading, dashboardError } = useDashboard();
  const queryClient = useQueryClient();
  // Load active menu from sessionStorage on mount, default to "home"
  const [activeMenu, setActiveMenu] = useState<MenuType>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("activeMenu");
      return (saved as MenuType) || "groups";
    }
    return "groups";
  });

  const [prevMenu, setPrevMenu] = useState<MenuType>(activeMenu);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Log dashboard data when loaded
  useEffect(() => {
    if (dashboardData) {
      console.log("Dashboard Data:", dashboardData);
    }
  }, [dashboardData]);

  // Save active menu to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("activeMenu", activeMenu);
    }
  }, [activeMenu]);

  // Handle menu change with animation direction
  const handleMenuChange = (newMenu: MenuType) => {
    if (newMenu === activeMenu || isAnimating) return;

    const currentIndex = menuOrder.indexOf(activeMenu);
    const newIndex = menuOrder.indexOf(newMenu);
    const direction = newIndex > currentIndex ? "left" : "right";

    setSlideDirection(direction);
    setIsAnimating(true);
    setPrevMenu(activeMenu);
    setActiveMenu(newMenu);

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const renderContent = (menu: MenuType) => {
    switch (menu) {
      case "home":
        return <HomeDashboard dashboardData={dashboardData} />;
      case "groups":
        return <Groups groupsData={dashboardData?.groups || [] as Group[]} moreGroupsAvailable={dashboardData?.moreGroupsAvailable} />;
      case "about-me":
        return <AboutMe showEditIcon={true} userInfo={dashboardData?.userInfo} />;
      case "help":
        return <Help />;
      default:
        return <HomeDashboard dashboardData={dashboardData} />;
    }
  };
  
  // Show loading state
  if (isDashboardLoading) {
    return (
      <CentralLoader label='Fetching user info...'/>
    );
  }
  
  // Show error state
  if (dashboardError) {
    console.log(dashboardError);
    const apiError = dashboardError as ApiError;
    const errorMessage = apiError?.data?.message;
    const errorDescription = (apiError?.data?.description as string);

    return (
      <ErrorComponent 
      message={errorMessage} 
      description={errorDescription} 
      buttonOnClick={() => {
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      }} />
    );
  }

  return (
    <div className="md:hidden min-h-screen bg-[var(--bg-card)] flex flex-col pb-0">
      {/* Page Content with Sliding Animation */}
      <div
        className="flex-1 overflow-hidden relative"
        style={{ height: "calc(100dvh - 120px)" }}
        ref={contentRef}
      >
        {/* Previous Content (exiting) */}
        {isAnimating && (
          <div
            className="absolute inset-0 overflow-y-auto"
            style={{
              animation:
                slideDirection === "left"
                  ? "slideOutToLeft 0.3s ease-in-out"
                  : "slideOutToRight 0.3s ease-in-out",
            }}
          >
            {renderContent(prevMenu)}
          </div>
        )}
        {/* Current Content (entering) */}
        <div
          className="absolute inset-0 overflow-y-auto"
          style={{
            animation: isAnimating
              ? slideDirection === "left"
                ? "slideInFromRight 0.3s ease-in-out"
                : "slideInFromLeft 0.3s ease-in-out"
              : "none",
          }}
        >
          {renderContent(activeMenu)}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--border)] z-50">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Home Icon */}
          <button
            onClick={() => handleMenuChange("home")}
            className="flex flex-col items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={activeMenu === "home" ? "var(--primary)" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
                stroke={
                  activeMenu === "home" ? "var(--primary)" : "var(--text-muted)"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Center Group: Groups, Plus, About Me */}
          <div className="flex items-center gap-6">
            {/* Groups Icon */}
            <button
              onClick={() => handleMenuChange("groups")}
              className="flex flex-col items-center justify-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                  stroke={
                    activeMenu === "groups"
                      ? "var(--primary)"
                      : "var(--text-muted)"
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Plus Icon (Floating Action Button) */}
            <button
              onClick={() => {
                // Handle plus button action
                console.log("Plus button clicked");
              }}
              className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg -mt-14 hover:bg-[var(--primary-hover)] transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="var(--text-inverse)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* About Me Icon */}
            <button
              onClick={() => handleMenuChange("about-me")}
              className="flex flex-col items-center justify-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke={
                    activeMenu === "about-me"
                      ? "var(--primary)"
                      : "var(--text-muted)"
                  }
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Help Icon */}
          <button
            onClick={() => handleMenuChange("help")}
            className="flex flex-col items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke={
                  activeMenu === "help" ? "var(--primary)" : "var(--text-muted)"
                }
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
