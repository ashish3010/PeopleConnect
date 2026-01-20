import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "@/src/components/common/Header";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

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
  userInfo?: UserInfo;
  showEditIcon?: boolean;
}

const AboutMe = ({
  showHeader = false,
  userInfo,
  showEditIcon = false,
}: AboutMeProps) => {
  const router = useRouter();

  const { name, email, image, department, organization, designation, linkedin, github, website, whatsapp } = userInfo || {};

  const headerHeight = showHeader ? 24 : 0;
  const cardTop = `calc(20vh + ${headerHeight}px)`;
  const pageHeight = `calc(100dvh - ${showHeader ? 0 : 120}px)`;

  const handleEditIconClick = () => {
    if (typeof window !== "undefined" && userInfo) {
      sessionStorage.setItem("editUserInfo", JSON.stringify(userInfo));
    }
    router.push("/edit-details");
  }

  return (
    <div style={{ height: "100%" }}>
      <div
        className="bg-[var(--bg-main)] relative"
        style={{ height: pageHeight }}
      >
        {showEditIcon && (
          <div className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-lg hover:bg-[var(--primary-hover)] transition-colors"
            onClick={handleEditIconClick}
          >
            <PencilSquareIcon className="w-5 h-5 text-[var(--bg-card)]" />
          </div>
        )}

        {showHeader && <Header title={name || ""} />}

        <div
          className="absolute left-1/2 transform -translate-x-1/2 z-20"
          style={{ top: `calc(${cardTop} - 80px)` }}
        >
          <div
            className="relative w-40 h-40 rounded-full overflow-hidden p-2"
            style={{
              background: !image ? `var(--bg-main)` : `transparent`,
              border: `${!image ? "1" : "0"}px solid var(--border)`,
              boxShadow: `${!image ? "0 -10px 30px var(--border)" : "none"
                }`,
            }}
          >
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={
                  image && image.trim() !== ""
                    ? image
                    : "/images/avatar.png"
                }
                alt={name || "Profile Picture"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0  left-0 right-0 bg-[var(--bg-card)] rounded-tl-[48px] rounded-tr-[48px]"
          style={{
            top: cardTop,
          }}
        >
          <div className="pt-24 px-6 pb-4">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-[var(--primary)]">
                {name}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
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
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
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

              {linkedin && (
                <a
                  href={linkedin}
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

              {github && (
                <a
                  href={github}
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

              {website && (
                <a
                  href={website}
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

          <div className="px-6 pb-20">
            <div className="space-y-4">
              {designation && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Designation
                  </p>
                  <p className="text-base text-[var(--text-primary)]">
                    {designation}
                  </p>
                </div>
              )}

              {department && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Department
                  </p>
                  <p className="text-base text-[var(--text-primary)]">
                    {department}
                  </p>
                </div>
              )}

              {organization && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] mb-1">
                    Organization
                  </p>
                  <p className="text-base text-[var(--text-primary)]">
                    {organization}
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
