import { useState, useEffect } from "react";

interface UseMediaReturn {
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isReady: boolean;
}

/**
 * Custom hook to detect device type based on screen width
 * @param mobileBreakpoint - Breakpoint for mobile (default: 768px)
 * @param tabletBreakpoint - Breakpoint for tablet (default: 1024px)
 * @returns Object with isMobile, isDesktop, isTablet, and isReady boolean values
 */
const useMedia = (
  mobileBreakpoint: number = 768,
  tabletBreakpoint: number = 1024
): UseMediaReturn => {
  // Initialize with consistent values for SSR (no window access)
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // Function to check and update media queries
    const checkMedia = () => {
      if (typeof window === "undefined") {
        return;
      }

      const width = window.innerWidth;
      setIsMobile(width < mobileBreakpoint);
      setIsTablet(width >= mobileBreakpoint && width < tabletBreakpoint);
      setIsDesktop(width >= tabletBreakpoint);
      setIsReady(true);
    };

    // Check immediately on mount
    checkMedia();

    // Listen for resize events
    window.addEventListener("resize", checkMedia);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMedia);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return { isMobile, isDesktop, isTablet, isReady };
};

export default useMedia;
