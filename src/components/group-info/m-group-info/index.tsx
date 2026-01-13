import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { List } from "react-window";

interface Member {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  department?: string;
  organization?: string;
  designation?: string;
}

interface GroupInfo {
  id: string;
  name: string;
  image?: string;
  members: Member[];
}

const MobileGroupInfo = () => {
  const router = useRouter();
  const [group, setGroup] = useState<GroupInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    // Get group info from sessionStorage
    const loadGroupData = () => {
      if (typeof window !== "undefined") {
        const savedGroup = sessionStorage.getItem("selectedGroup");
        if (savedGroup) {
          try {
            const groupData = JSON.parse(savedGroup);
            // For now, use mock data structure matching group.json
            // In production, you'd fetch this from an API
            const mockGroupData: GroupInfo = {
              id: groupData.id || "group1",
              name: groupData.name || "Group One",
              image: "https://example.com/images/group1.png",
              members: [
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image: "",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
                {
                  id: "user1",
                  name: "Alice Smith",
                  email: "alice@example.com",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
                  role: "Admin",
                  department: "Engineering",
                  organization: "Example Org",
                  designation: "Software Engineer",
                },
                {
                  id: "user2",
                  name: "Bob Johnson",
                  email: "bob@example.com",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Design",
                  organization: "Example Org",
                  designation: "UI/UX Designer",
                },
                {
                  id: "user3",
                  name: "Charlie Brown",
                  email: "charlie@example.com",
                  image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
                  role: "Member",
                  department: "Product",
                  organization: "Example Org",
                  designation: "Product Manager",
                },
              ],
            };
            setGroup(mockGroupData);
          } catch (e) {
            console.error("Error parsing group data:", e);
            router.back();
          }
        } else {
          // No group data, navigate back
          router.back();
        }
      }
    };

    loadGroupData();
  }, [router]);

  // Handle clicks outside menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuId &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId]?.contains(event.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  // Handle make admin action
  const handleMakeAdmin = (memberId: string) => {
    // TODO: Implement make admin API call
    console.log("Making member admin:", memberId);
    setOpenMenuId(null);
    // You can add toast notification here
  };

  // Handle remove member action
  const handleRemoveMember = (memberId: string, memberName: string) => {
    // TODO: Implement remove member API call
    console.log("Removing member:", memberId, memberName);
    setOpenMenuId(null);
    // You can add toast notification here
  };

  // Handle member click to navigate to user-info page
  const handleMemberClick = (member: Member) => {
    // Store member info in sessionStorage for the user-info page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedUser", JSON.stringify(member));
    }
    router.push("/user-info");
  };

  // Filter members based on search query
  const filteredMembers =
    group?.members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Ref for the list container to calculate height
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(400);

  // Calculate list height based on container
  useEffect(() => {
    const updateHeight = () => {
      if (listContainerRef.current) {
        const height = listContainerRef.current.clientHeight;
        setListHeight(height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Row component for virtualized list
  const MemberRow = ({
    index,
    style,
    ariaAttributes,
  }: {
    index: number;
    style: React.CSSProperties;
    ariaAttributes: {
      "aria-posinset": number;
      "aria-setsize": number;
      role: "listitem";
    };
  }) => {
    const member = filteredMembers[index];
    if (!member) return null;

    return (
      <div
        style={{
          ...style,
          zIndex: openMenuId === member.id ? 50 : 1,
        }}
        className="flex items-center gap-3 px-4 py-4 border-b border-[var(--border)] h-[72px] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
        onClick={() => handleMemberClick(member)}
        {...ariaAttributes}
      >
        {/* Profile Picture */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[var(--bg-muted)]">
          <Image
            src={
              member.image && member.image.trim() !== ""
                ? member.image
                : "/images/avatar.png"
            }
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Member Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
              {member.name}
            </h3>
            {member.role?.toLowerCase() === "admin" && (
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[var(--success-soft)] text-[var(--success)] flex-shrink-0">
                ADMIN
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-1">
            {member.designation || member.role}
            {member.organization && ` • ${member.organization}`}
          </p>
        </div>

        {/* Options Icon with Dropdown */}
        <div
          className="relative flex-shrink-0"
          ref={(el) => {
            menuRefs.current[member.id] = el;
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(openMenuId === member.id ? null : member.id);
            }}
            className="flex-shrink-0 p-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                fill="var(--text-muted)"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                fill="var(--text-muted)"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                fill="var(--text-muted)"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {openMenuId === member.id && (
            <div
              className="absolute right-0 top-full mt-2 rounded-lg shadow-xl border border-[var(--border)] min-w-[180px] overflow-hidden"
              style={{
                backgroundColor: "#ffffff",
                zIndex: 99999,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMakeAdmin(member.id);
                }}
                className="w-full px-4 py-3 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-3 first:rounded-t-lg"
                style={{ backgroundColor: "#ffffff" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span>Make group admin</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveMember(member.id, member.name);
                }}
                className="w-full px-4 py-3 text-left text-sm text-[var(--danger)] hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-3 last:rounded-b-lg"
                style={{ backgroundColor: "#ffffff" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                    stroke="var(--danger)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 11V17M14 11V17"
                    stroke="var(--danger)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!group) {
    return null;
  }

  return (
    <div
      className="md:hidden bg-[var(--bg-main)] flex flex-col overflow-hidden"
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
      }}
    >
      {/* Top Header Section */}
      <div className="bg-[var(--bg-main)] pt-4 pb-4 px-4 flex-shrink-0 z-30">
        {/* Back Arrow and Title */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="var(--text-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">
            {group.name}
          </h1>
        </div>

        {/* Search Bar and Filter */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="var(--text-muted)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-card)] rounded-lg pl-10 pr-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none border-0"
            />
          </div>
          <button className="w-10 h-10 bg-[var(--bg-card)] rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H20"
                stroke="var(--text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area - Members List */}
      <div
        className="flex-1 bg-[var(--bg-card)] rounded-t-3xl flex flex-col relative min-h-0"
        style={{ marginBottom: "88px" }}
      >
        {/* Extended white background to cover footer area */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[var(--bg-card)]"
          style={{ height: "88px", bottom: "-88px" }}
        ></div>
        <div
          ref={listContainerRef}
          className="flex-1 overflow-hidden flex flex-col relative z-10"
          style={{ minHeight: 0 }}
        >
          {filteredMembers.length === 0 ? (
            <div className="flex items-center justify-center h-full py-12">
              <p className="text-[var(--text-muted)]">No members found</p>
            </div>
          ) : (
            <List
              defaultHeight={listHeight}
              rowCount={filteredMembers.length}
              rowHeight={72}
              style={{ height: listHeight, paddingBottom: "88px" }}
              rowComponent={MemberRow}
              rowProps={{}}
            />
          )}
        </div>
      </div>

      {/* Fixed Footer with Leave Group Button */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[var(--bg-card)] border-t border-[var(--border)] z-20"
        style={{
          paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={() => {
            // TODO: Implement leave group API call
            console.log("Leaving group:", group.id);
            router.back();
            // You can add toast notification here
          }}
          className="w-full h-10 rounded-xl font-semibold bg-transparent border-2 border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger-soft)] transition-colors"
        >
          Leave group
        </button>
      </div>
    </div>
  );
};

export default MobileGroupInfo;
