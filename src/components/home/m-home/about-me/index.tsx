import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface UserInfo {
  id?: string;
  name: string;
  email: string;
  image: string;
  department?: string;
  organization?: string;
  designation?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  whatsapp?: string;
}

interface AboutMeProps {
  showHeader?: boolean;
  headerText?: string;
  userInfo?: UserInfo;
  showEditIcon?: boolean;
}

const AboutMe = ({
  showHeader = false,
  headerText,
  userInfo,
  showEditIcon = false,
}: AboutMeProps) => {
  const router = useRouter();

  // Mock user info if not provided
  const defaultUserInfo: UserInfo = {
    name: "John Doe",
    email: "user@example.com",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    department: "Engineering",
    organization: "Example Org",
    designation: "Software Engineer",
    linkedin: "https://www.linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.com",
    whatsapp: "+1234567890",
  };

  const user = userInfo || defaultUserInfo;

  // Header height is approximately 64px (pt-4 + content height)
  const headerHeight = showHeader ? 24 : 0;
  // Calculate top position: 30vh + header height
  const cardTop = `calc(20vh + ${headerHeight}px)`;
  const pageHeight = `calc(100dvh - ${showHeader ? 0 : 120}px)`;
  return (
    <div style={{ height: "100%" }}>
      <div
        className="bg-[var(--bg-main)] relative"
        style={{ height: pageHeight }}
      >
        {/* Floating Edit Icon - Fixed at top */}
        {showEditIcon && (
          <button
            className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg hover:bg-[var(--primary-hover)] transition-colors"
            onClick={() => {
              // Save userInfo to sessionStorage before navigating
              if (typeof window !== "undefined" && user) {
                sessionStorage.setItem("editUserInfo", JSON.stringify(user));
              }
              router.push("/edit-details");
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="var(--text-inverse)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 2.5C18.8978 2.10218 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10218 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10218 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
                stroke="var(--text-inverse)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Header - Fixed at top */}
        {showHeader && (
          <div className="fixed top-0 left-0 right-0 w-full mb-4 px-4 pt-4 z-20 bg-[var(--bg-main)]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-8 h-8"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">
                {headerText || user.name}
              </h1>
            </div>
          </div>
        )}

        {/* Profile Picture - Overlapping both sections */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-20"
          style={{ top: `calc(${cardTop} - 80px)` }}
        >
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden p-2"
            style={{
              background: !user.image ? `var(--bg-main)` : `transparent`,
              border: `${!user.image ? "1" : "0"}px solid var(--border)`,
              boxShadow: `${
                !user.image ? "0 -10px 30px var(--border)" : "none"
              }`,
            }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={
                  user.image && user.image.trim() !== ""
                    ? user.image
                    : "/images/avatar.png"
                }
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* White card from 30vh + header height to bottom */}
        <div
          className="absolute bottom-0  left-0 right-0 bg-[var(--bg-card)] rounded-tl-[48px] rounded-tr-[48px]"
          style={{
            top: cardTop,
          }}
        >
          {/* Fixed Section: Name and Icons */}
          <div className="pt-24 px-6 pb-4">
            {/* Name */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-[var(--primary)]">
                {user.name}
              </h2>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center justify-center gap-4">
              {/* Email */}
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-[var(--bg-hover)] transition-colors overflow-hidden p-0"
                >
                  <Image
                    src="/images/email.png"
                    alt="Email"
                    width={32}
                    height={32}
                    className="object-contain rounded-full"
                  />
                </a>
              )}

              {/* WhatsApp */}
              {user.whatsapp && (
                <a
                  href={`https://wa.me/${user.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-[var(--bg-hover)] transition-colors overflow-hidden p-0"
                >
                  <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    width={32}
                    height={32}
                    className="object-contain rounded-full"
                  />
                </a>
              )}

              {/* LinkedIn */}
              {user.linkedin && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-[var(--bg-hover)] transition-colors overflow-hidden p-0"
                >
                  <Image
                    src="/images/linkedin.png"
                    alt="LinkedIn"
                    width={32}
                    height={32}
                    className="object-contain rounded-full"
                  />
                </a>
              )}

              {/* GitHub */}
              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-[var(--bg-hover)] transition-colors overflow-hidden p-0"
                >
                  <Image
                    src="/images/github.png"
                    alt="GitHub"
                    width={32}
                    height={32}
                    className="object-contain rounded-full"
                  />
                </a>
              )}

              {/* Website */}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-[var(--bg-hover)] transition-colors overflow-hidden p-0"
                >
                  <Image
                    src="/images/website.png"
                    alt="Website"
                    width={32}
                    height={32}
                    className="object-contain rounded-full"
                  />
                </a>
              )}
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="px-6 pb-20">
            {/* Professional Details */}
            <div className="space-y-4">
              {user.designation && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Designation
                  </p>
                  <p className="text-base text-[var(--text-primary)]">
                    {user.designation}
                  </p>
                </div>
              )}

              {user.department && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Department
                  </p>
                  <p className="text-base text-[var(--text-primary)]">
                    {user.department}
                  </p>
                </div>
              )}

              {user.organization && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Organization
                  </p>
                  <p className="text-base text-[var(--text-primary)]">
                    {user.organization}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
