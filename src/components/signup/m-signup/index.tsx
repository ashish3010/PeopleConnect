import React, { useState } from "react";

const MobileSignup = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="md:hidden">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#3ec6c1] to-[#A1E3E3]">
        <div className="relative w-full max-w-sm mx-auto">
          {/* Wavy SVG background - more organic and higher */}
          <svg
            className="absolute top-0 left-0 w-full h-28"
            viewBox="0 0 400 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: 1 }}
          >
            <path
              d="M0 100 Q 80 10 200 40 Q 320 70 400 20 V100H0Z"
              fill="white"
            />
          </svg>
          <div className="pt-20 pb-6 px-4 bg-[#181B2E] rounded-2xl shadow-lg border border-[#232646] relative z-10 mx-2">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
              Sign Up
            </h1>
            {submitted ? (
              <div className="text-green-400 text-center">
                Signup successful!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#232646] text-white placeholder-[#A1A4C2] text-base focus:outline-none focus:ring-2 focus:ring-[#A1A4FC]"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <div className="flex gap-2">
                  <input
                    className="w-1/2 px-4 py-3 rounded-xl border border-transparent bg-[#232646] text-white placeholder-[#A1A4C2] text-base focus:outline-none focus:ring-2 focus:ring-[#A1A4FC]"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-1/2 px-4 py-3 rounded-xl border border-transparent bg-[#232646] text-white placeholder-[#A1A4C2] text-base focus:outline-none focus:ring-2 focus:ring-[#A1A4FC]"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#232646] text-white placeholder-[#A1A4C2] text-base focus:outline-none focus:ring-2 focus:ring-[#A1A4FC]"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <input
                  className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#232646] text-white placeholder-[#A1A4C2] text-base focus:outline-none focus:ring-2 focus:ring-[#A1A4FC]"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#A1A4FC] text-white font-semibold text-base hover:bg-[#7C7CFF] transition-colors mt-2"
                >
                  Next
                </button>
              </form>
            )}
            <div className="text-center text-[#A1A4C2] mt-6 block md:hidden text-sm">
              Already have an account?
              <a href="/login" className="ml-1 text-[#A1A4FC] underline">
                Login
              </a>
            </div>
            {/* Floating avatar bottom left */}
            <div className="absolute left-4 bottom-[-32px]">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg border border-[#232646]">
                N
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSignup;
