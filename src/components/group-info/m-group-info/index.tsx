import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { List } from "react-window";
import SideMenu from "../../common/SideMenu";
import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import Header from "../../common/Header";
import SearchBox from "../../common/SearchBox";

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
          <SideMenu
            onMenuClick={() => setOpenMenuId(member.id)}
            showMenu={openMenuId === member.id}
            menuItems={[
              {
                icon: <StarIcon className="w-5 h-5 text-[var(--primary)]" />,
                label: "Make group admin",
                onClick: () => handleMakeAdmin(member.id),
              },
              {
                icon: <TrashIcon className="w-5 h-5 text-[var(--danger)]" />,
                label: "Remove",
                onClick: () => handleRemoveMember(member.id, member.name),
              },
            ]}
          />
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
      <div className="bg-[var(--bg-main)] flex-shrink-0 z-30">
        <Header title={group.name} />
        <div className="px-4 pb-4">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      <div
        className="flex-1 bg-[var(--bg-card)] rounded-t-3xl flex flex-col relative min-h-0"
        style={{ marginBottom: "88px" }}
      >
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
