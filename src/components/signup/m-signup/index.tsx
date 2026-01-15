import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Button from "@/src/components/common/Button";
import Input from "@/src/components/common/Input";
import useAuth from "@/src/hooks/useAuth/useAuth";
import Header from "../../common/Header";
import FileInput from "../../common/FileInput";
import { useToast } from "@/src/Providers/toast-provider";
import { ApiError } from "@/src/network";

const MobileSignup = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { signup, isSignupLoading } = useAuth();
  const { showError } = useToast();

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    };

    resetScroll();

    const timeoutId = setTimeout(resetScroll, 10);
    const timeoutId2 = setTimeout(resetScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [router.pathname]);

  const [form, setForm] = useState({
    email: "",
    name: "",
    contact: "",
    organization: "",
    department: "",
    designation: "",
    linkedin: "",
    github: "",
    website: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const isFormValid =
    form.email.trim() !== "" &&
    form.name.trim() !== "" &&
    form.contact.trim() !== "" &&
    form.organization.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    const fileInput = document.querySelector(
      'input[type="file"][name="image"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(form);
      router.push("/otp");
    } catch (error) {
      const err = error as ApiError;
      showError(err.message);
    }
  };

  return (
    <div className="md:hidden">
      <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
        <Header title="Sign Up" />
        <div className="w-full bg-[var(--bg-card)] rounded-t-3xl shadow-lg overflow-hidden flex-1 flex flex-col pb-24">
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 pt-6"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">
                Welcome!
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              id="signup-form"
              className="space-y-6 pb-4"
            >
              <Input
                type="email"
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <FileInput
                name="image"
                accept="image/*"
                value={image}
                onChange={handleImageChange}
                onRemove={handleRemoveImage}
              />

              <Input
                type="text"
                name="name"
                label="Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                type="tel"
                name="contact"
                label="Contact"
                value={form.contact}
                onChange={handleChange}
                required
              />

              <Input
                type="text"
                name="organization"
                label="Organization"
                value={form.organization}
                onChange={handleChange}
                required
              />

              <Input
                type="text"
                name="department"
                label="Department"
                value={form.department}
                onChange={handleChange}
              />

              <Input
                type="text"
                name="designation"
                label="Designation"
                value={form.designation}
                onChange={handleChange}
              />

              <Input
                type="url"
                name="linkedin"
                label="LinkedIn URL"
                value={form.linkedin}
                onChange={handleChange}
              />

              <Input
                type="url"
                name="github"
                label="GitHub URL"
                value={form.github}
                onChange={handleChange}
              />

              <Input
                type="url"
                name="website"
                label="Website URL"
                value={form.website}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>

        {/* Fixed button at bottom of viewport */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[var(--bg-card)] border-t border-[var(--border)] z-10">
          <Button
            type="submit"
            form="signup-form"
            disabled={!isFormValid}
            loading={isSignupLoading}
            className="h-10 rounded-xl font-semibold"
          >
            {"Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileSignup;
