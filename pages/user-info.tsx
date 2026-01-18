import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import CentralLoader from "@/src/components/common/Central-loader";
import useMedia from "@/src/hooks/useMedia/useMedia";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  image: string;
  role?: string;
  department?: string;
  organization?: string;
  designation?: string;
}

const MobileUserInfo = dynamic(
  () => import("@/src/components/user-info/m-user-info"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);

const DesktopUserInfo = dynamic(
  () => import("@/src/components/user-info/d-user-info"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);

const UserInfo = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Get user info from sessionStorage
    const loadUserData = () => {
      if (typeof window !== "undefined") {
        const savedUser = sessionStorage.getItem("selectedUser");
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser) as UserInfo;
            setUserInfo(userData);
          } catch (error) {
            console.error("Error parsing user data:", error);
            router.back();
          }
        } else {
          router.back();
        }
      }
    };

    loadUserData();
  }, [router]);

  const { isMobile, isReady } = useMedia();

  if (!userInfo || !isReady) {
    return <CentralLoader />;
  }

  return (
    <div>
      {isMobile ? <MobileUserInfo userInfo={userInfo} /> : <DesktopUserInfo />}
    </div>
  );
};

export default UserInfo;
