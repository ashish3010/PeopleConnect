import DesktopSignup from "@/src/components/signup/d-signup";
import MobileSignup from "@/src/components/signup/m-signup";
import React from "react";

const SignUp = () => {
  return (
    <div>
      <MobileSignup />
      <DesktopSignup />
    </div>
  );
};

export default SignUp;
