import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Button from "@/src/components/common/Button";
import Header from "../../common/Header";
import FileInput from "../../common/FileInput";
import Input from "../../common/Input";
import { useToast } from "@/src/Providers/toast-provider";

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
  const { showSuccess, showError } = useToast();
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
    // showSuccess("Details updated successfully");
    showError("Details updated failed");
    // router.back();
  };

  return (
    <div className="md:hidden">
      <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
        <Header title="Edit Details" />
        <div className="w-full bg-[var(--bg-card)] rounded-t-3xl shadow-lg overflow-hidden flex-1 flex flex-col pb-24">
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-6 pt-6"
          >
            <form
              onSubmit={handleSubmit}
              id="edit-form"
              className="space-y-6 pb-4"
            >
              <FileInput
                name="image"
                accept="image/*"
                value={image}
                onChange={handleImageChange}
                onRemove={handleRemoveImage}
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
