import React from "react";
import AboutMe from "../../home/m-home/about-me";

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

const MobileUserInfo = ({ userInfo }: { userInfo: UserInfo }) => {
  return (
    <div>
      <AboutMe showHeader={true} userInfo={userInfo} />
    </div>
  );
};

export default MobileUserInfo;
