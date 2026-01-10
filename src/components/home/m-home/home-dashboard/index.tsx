import React from "react";
import Image from "next/image";

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-card)] flex flex-col">
      <div className="relative bg-[var(--bg-main)] rounded-bl-[48px] rounded-br-[48px]">
        <div className="px-6 pt-6 pb-6">
          {/* Name and Image */}
          <div className="flex items-center justify-between mb-8">
            {/* Left side - Greeting */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-[var(--primary)] mb-1">
                Hi Smitty
              </h1>
              <p className="text-sm text-[var(--text-muted)]">How are you?</p>
            </div>

            {/* Right side - Profile Picture */}
            <div className="w-16 h-16 rounded-2xl bg-white overflow-hidden shadow-md relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Connect through trusted groups
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              This platform helps you connect with professionals by creating and
              joining groups built around shared interests, teams, or goals.
              Each group brings people together in a focused, distraction-free
              environment.
            </p>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          How it works
        </h2>

        <div className="space-y-3">
          {/* Create your profile */}
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
              Create your profile
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Add your professional details so others can understand who you are
              and what you do.
            </p>
          </div>

          {/* Join or create groups */}
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
              Join or create groups
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Create groups or join existing ones through invite links shared by
              members.
            </p>
          </div>

          {/* Connect with people */}
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">
              Connect with people
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore group members, view profiles, and build meaningful
              professional connections.
            </p>
          </div>
        </div>
      </div>

      {/* Why this platform Section */}
      <div className="px-6 pb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
          Why this platform
        </h2>

        <div className="space-y-1">
          {/* Invite-only groups */}
          <div className="flex items-start">
            <span className="text-[var(--text-secondary)] mr-2">•</span>
            <p className="text-sm text-[var(--text-secondary)]">
              Invite-only groups for trusted connections
            </p>
          </div>

          {/* Clean, privacy-first design */}
          <div className="flex items-start">
            <span className="text-[var(--text-secondary)] mr-2">•</span>
            <p className="text-sm text-[var(--text-secondary)]">
              Clean, privacy-first design
            </p>
          </div>

          {/* Profiles focused on professional information */}
          <div className="flex items-start">
            <span className="text-[var(--text-secondary)] mr-2">•</span>
            <p className="text-sm text-[var(--text-secondary)]">
              Profiles focused on professional information
            </p>
          </div>

          {/* Simple and transparent experience */}
          <div className="flex items-start">
            <span className="text-[var(--text-secondary)] mr-2">•</span>
            <p className="text-sm text-[var(--text-secondary)]">
              Simple and transparent experience
            </p>
          </div>
        </div>
      </div>
      {/* Bottom padding for navigation bar - ensures bg-card extends to bottom */}
      <div className="bg-[var(--bg-card)] pb-20"></div>
    </div>
  );
};

export default HomeDashboard;
