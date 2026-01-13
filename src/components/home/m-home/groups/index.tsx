import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import groupsData from "../../../../../api-res/groups.json";

interface Group {
  id: string;
  name: string;
  membersCount: number;
}

const Groups = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const groups: Group[] =
    (groupsData as { groupsList: Group[] }).groupsList || [];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuElement = menuRefs.current[openMenuId];
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  const handleLeaveGroup = (groupId: string, groupName: string) => {
    // TODO: Implement leave group API call
    console.log("Leaving group:", groupId, groupName);
    setOpenMenuId(null);
    // You can add toast notification here
  };

  const handleGroupClick = (group: Group) => {
    // Store group info in sessionStorage for the group-info page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedGroup", JSON.stringify(group));
    }
    router.push("/group-info");
  };

  // Filter groups based on search query
  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] flex flex-col"
      style={{ height: "calc(100dvh - 120px)" }}
    >
      {/* Top Header Section */}
      <div className="bg-[var(--bg-main)] pt-4 pb-4 px-4 flex-shrink-0">
        {/* Back Arrow and Title */}
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center justify-center">
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
            Groups
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

      {/* Main Content Area - Groups List */}
      <div className="flex-1 bg-[var(--bg-card)] rounded-t-3xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <div className="flex items-center justify-center h-full py-12">
              <p className="text-[var(--text-muted)]">No groups found</p>
            </div>
          ) : (
            <div className="px-4 py-2">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center gap-3 py-4 border-b border-[var(--border)] last:border-b-0 cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
                  onClick={() => handleGroupClick(group)}
                >
                  {/* Group Avatar */}
                  {/* <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={getGroupImage(group.name)}
                      alt={group.name}
                      fill
                      className="object-cover"
                    />
                  </div> */}

                  {/* Group Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
                      {group.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-1">
                      {group.membersCount}{" "}
                      {group.membersCount === 1 ? "member" : "members"}
                    </p>
                  </div>

                  {/* Options Icon with Dropdown */}
                  <div
                    className="relative flex-shrink-0"
                    ref={(el) => {
                      menuRefs.current[group.id] = el;
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering group click
                        setOpenMenuId(
                          openMenuId === group.id ? null : group.id
                        );
                      }}
                      className="p-2"
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
                    {openMenuId === group.id && (
                      <div className="absolute right-0 top-full mt-2 bg-[var(--bg-card)] rounded-lg shadow-lg border border-[var(--border)] min-w-[160px] z-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering group click
                            handleLeaveGroup(group.id, group.name);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors flex items-center gap-3"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                              stroke="var(--danger)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-[var(--danger)]">
                            Leave group
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Groups;
