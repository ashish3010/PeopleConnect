import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] =
    useState<React.ReactNode>(children);
  const [prevChildren, setPrevChildren] = useState<React.ReactNode>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const navigationStackRef = useRef<string[]>([]);
  const isBackNavigationRef = useRef<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const isTransitioningRef = useRef<boolean>(false);

  // Initialize navigation stack
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      navigationStackRef.current.length === 0
    ) {
      navigationStackRef.current = [router.asPath];
    }
  }, [router.asPath]);

  // Use refs to track latest values
  const childrenRef = useRef<React.ReactNode>(children);
  const displayChildrenRef = useRef<React.ReactNode>(displayChildren);

  // Update displayChildren only when not transitioning
  // Using useLayoutEffect to sync immediately and prevent flicker
  React.useLayoutEffect(() => {
    childrenRef.current = children;
    if (!isTransitioningRef.current) {
      setDisplayChildren(children);
      displayChildrenRef.current = children;
    } else {
      displayChildrenRef.current = displayChildren;
    }
  }, [children, displayChildren]);

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const currentPath = router.asPath;

      // Mark that we're transitioning - prevent new children from rendering
      isTransitioningRef.current = true;

      // Store current display children as previous (use ref to get latest)
      setPrevChildren(displayChildrenRef.current);

      // Check if this is a back navigation
      // Back navigation: URL exists in stack and is not the last item
      const urlIndex = navigationStackRef.current.indexOf(url);
      const lastIndex = navigationStackRef.current.length - 1;
      const isBackNavigation = urlIndex >= 0 && urlIndex < lastIndex;

      isBackNavigationRef.current = isBackNavigation;

      // Forward navigation (left): new page slides in from right
      // Back navigation (right): new page slides in from left
      setSlideDirection(isBackNavigation ? "right" : "left");

      // Update navigation stack BEFORE starting animation
      if (isBackNavigation) {
        // Remove everything after the target URL
        navigationStackRef.current = navigationStackRef.current.slice(
          0,
          urlIndex + 1
        );
      } else {
        // Forward navigation - add current path if not in stack, then add new URL
        if (!navigationStackRef.current.includes(currentPath)) {
          navigationStackRef.current.push(currentPath);
        }
        if (!navigationStackRef.current.includes(url)) {
          navigationStackRef.current.push(url);
        }
      }

      // Increment animation key to force React to re-apply animation
      setAnimationKey((prev) => prev + 1);
    };

    const handleRouteChangeComplete = () => {
      // Wait for the new page to fully render (especially for dynamic imports and useMedia)
      // Use multiple RAF to ensure content is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Now update displayChildren with the new page
          setDisplayChildren(childrenRef.current);

          // Start the animation once the new page is ready
          setIsAnimating(true);
        });
      });

      // Animation completes after transition
      setTimeout(() => {
        setIsAnimating(false);
        setPrevChildren(null);
        isTransitioningRef.current = false;
      }, 300);
    };

    // Detect browser back/forward buttons
    const handlePopState = () => {
      // When popstate fires, it means back/forward button was used
      // We'll determine direction in routeChangeStart based on stack
      isBackNavigationRef.current = true;
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    if (typeof window !== "undefined") {
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      if (typeof window !== "undefined") {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  }, [router]);

  return (
    <div
      className="relative w-full h-full"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      {/* Previous Page (exiting) - Show when animating */}
      {isAnimating && prevChildren && (
        <div
          key={`exit-${animationKey}`}
          className="absolute inset-0 z-10"
          style={{
            animation:
              slideDirection === "left"
                ? "slideOutToLeft 0.3s ease-in-out forwards"
                : "slideOutToRight 0.3s ease-in-out forwards",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {prevChildren}
        </div>
      )}
      {/* Current Page - Show when not animating */}
      {!isAnimating && (
        <div className="relative w-full h-full">{displayChildren}</div>
      )}
      {/* Entering Page - Show when animating */}
      {isAnimating && (
        <div
          key={`enter-${animationKey}`}
          className={`absolute inset-0 z-20 ${
            slideDirection === "left"
              ? "page-enter-from-right"
              : "page-enter-from-left"
          }`}
          style={{
            animation:
              slideDirection === "left"
                ? "slideInFromRight 0.3s ease-in-out forwards"
                : "slideInFromLeft 0.3s ease-in-out forwards",
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {displayChildren}
        </div>
      )}
    </div>
  );
};

export default PageTransition;
