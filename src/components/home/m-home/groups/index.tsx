import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import groupsData from "../../../../../api-res/groups.json";
import Header from "@/src/components/common/Header";
import SideMenu from "@/src/components/common/SideMenu";
import { TrashIcon } from "@heroicons/react/24/outline";

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
    console.log("Leaving group:", groupId, groupName);
    setOpenMenuId(null);
  };

  const handleGroupClick = (group: Group) => {
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
      <Header title="Groups" hideBackButton />
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

                  <div
                    className="relative flex-shrink-0"
                    ref={(el) => {
                      menuRefs.current[group.id] = el;
                    }}
                  >
                    <SideMenu
                      onMenuClick={() => setOpenMenuId(group.id)}
                      showMenu={openMenuId === group.id}
                      menuItems={[
                        {
                          icon: (
                            <TrashIcon className="w-5 h-5 text-[var(--danger)]" />
                          ),
                          label: "Leave group",
                          onClick: () => handleLeaveGroup(group.id, group.name),
                        },
                      ]}
                    />
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
