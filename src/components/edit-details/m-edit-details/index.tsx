import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Button from "@/src/components/common/Button";
import Header from "../../common/Header";

interface UserInfo {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  department?: string;
  organization?: string;
  designation?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  whatsapp?: string;
  contact?: string;
}

interface MobileEditDetailsProps {
  userInfo?: UserInfo;
}

const MobileEditDetails = ({
  userInfo: propUserInfo,
}: MobileEditDetailsProps) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Get userInfo from props or sessionStorage
  const getUserInfo = (): UserInfo | undefined => {
    if (propUserInfo) return propUserInfo;
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("editUserInfo");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error parsing userInfo from sessionStorage:", e);
        }
      }
    }
    return undefined;
  };

  const userInfo = getUserInfo();

  // Navigate back if userInfo is undefined
  useEffect(() => {
    if (!userInfo) {
      router.back();
    }
  }, [userInfo, router]);

  // Scroll to top when component mounts or route changes
  useEffect(() => {
    const resetScroll = () => {
      // Reset window scroll
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Reset scrollable container
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    };

    // Reset immediately
    resetScroll();

    // Also reset after a small delay to ensure DOM is ready
    const timeoutId = setTimeout(resetScroll, 10);
    const timeoutId2 = setTimeout(resetScroll, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [router.pathname]);

  const initialForm = {
    contact: userInfo?.contact || userInfo?.whatsapp || "",
    organization: userInfo?.organization || "",
    department: userInfo?.department || "",
    designation: userInfo?.designation || "",
    linkedin: userInfo?.linkedin || "",
    github: userInfo?.github || "",
    website: userInfo?.website || "",
  };

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState<File | null>(null);
  const initialImage = null; // Track if image was changed

  // Check if form has changed from initial values
  const hasFormChanged = JSON.stringify(form) !== JSON.stringify(initialForm);

  // Check if image has changed
  const hasImageChanged = image !== initialImage;

  // Check if image input has an image
  const hasImage = image !== null;

  // Check if required fields are filled
  const hasRequiredFields =
    form.contact.trim() !== "" && form.organization.trim() !== "";

  // Enable button if (form changed OR (image changed AND has image)) AND required fields are filled
  const isFormValid =
    (hasFormChanged || (hasImageChanged && hasImage)) && hasRequiredFields;

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
    // Reset the file input
    const fileInput = document.querySelector(
      'input[type="file"][name="image"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Add API call logic for updating user details
    // const formData = new FormData();
    // Object.entries(form).forEach(([key, value]) => {
    //   if (value) {
    //     formData.append(key, value);
    //   }
    // });
    // if (image) {
    //   formData.append("image", image);
    // }

    // After successful update, navigate back
    router.back();
  };

  return (
    <div className="md:hidden">
      <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
        <Header title="Edit Details" />

        {/* Main white card */}
        <div className="w-full bg-[var(--bg-card)] rounded-t-3xl shadow-lg overflow-hidden flex-1 flex flex-col pb-24">
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 pt-6"
          >
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              id="edit-form"
              className="space-y-6 pb-4"
            >
              {/* Image upload */}
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!!image}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 pr-10 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-[var(--text-inverse)] hover:file:bg-[var(--primary-hover)] file:cursor-pointer cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-0 bottom-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Contact input */}
              <div className="relative">
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Contact <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="tel"
                  name="contact"
                  placeholder="Contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                  required
                />
              </div>

              {/* Organization input */}
              <div className="relative">
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  Organization <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  placeholder="Organization"
                  value={form.organization}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                  required
                />
              </div>

              {/* Department input */}
              <div className="relative">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                />
              </div>

              {/* Designation input */}
              <div className="relative">
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                />
              </div>

              {/* LinkedIn input */}
              <div className="relative">
                <input
                  type="url"
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                />
              </div>

              {/* GitHub input */}
              <div className="relative">
                <input
                  type="url"
                  name="github"
                  placeholder="GitHub URL"
                  value={form.github}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                />
              </div>

              {/* Website input */}
              <div className="relative">
                <input
                  type="url"
                  name="website"
                  placeholder="Website URL"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Fixed button at bottom of viewport */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[var(--bg-card)] border-t border-[var(--border)] z-10">
          <Button
            type="submit"
            form="edit-form"
            disabled={!isFormValid}
            className="h-10 rounded-xl font-semibold"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileEditDetails;
