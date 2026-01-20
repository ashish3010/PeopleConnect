import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import Header from "@/src/components/common/Header";
import SideMenu from "@/src/components/common/SideMenu";
import Spinner from "@/src/components/common/Spinner";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Group } from "@/src/hooks/useDashboard/types";
import SearchBox from "@/src/components/common/SearchBox";
import useGroups, { useLeaveGroup, useSearchGroups } from "@/src/hooks/useGroups/useGroups";
import useDebouncedValue from "@/src/hooks/useDebounce/useDebounce";
import { useToast } from "@/src/Providers/toast-provider";
import { ApiError } from "@/src/network";
import { LeaveGroupResponse } from "@/src/hooks/useGroups/types";

// Memoized GroupRow component to prevent unnecessary re-renders
interface GroupRowProps {
  group: Group;
  isMenuOpen: boolean;
  onGroupClick: (group: Group) => void;
  onMenuClick: (groupId: string) => void;
  onLeaveGroup: (groupId: string, groupName: string) => void;
  menuRef: (el: HTMLDivElement | null, groupId: string) => void;
  isLeavingGroup: boolean;
}

const GroupRow = React.memo(({
  group,
  isMenuOpen,
  onGroupClick,
  onMenuClick,
  onLeaveGroup,
  menuRef,
  isLeavingGroup
}: GroupRowProps) => {
  return (
    <div
      className="flex items-center gap-3 py-4 border-b border-[var(--border)] cursor-pointer hover:bg-[var(--bg-hover)] transition-colors"
      onClick={() => onGroupClick(group)}
    >
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
        ref={(el) => menuRef(el, group.id)}
        onClick={(e) => e.stopPropagation()}
      >
        <SideMenu
          onMenuClick={() => onMenuClick(group.id)}
          showMenu={isMenuOpen}
          menuItems={[
            {
              icon: (
                <TrashIcon className="w-5 h-5 text-[var(--danger)]" />
              ),
              label: "Leave group",
              onClick: () => onLeaveGroup(group.id, group.name),
              loading: isLeavingGroup,
              disabled: isLeavingGroup,
              disabledTooltip: isLeavingGroup ? "Leaving group..." : undefined,
            },
          ]}
        />
      </div>
    </div>
  );
});

GroupRow.displayName = "GroupRow";

const Groups = ({ groupsData = [], moreGroupsAvailable = false }: { groupsData: Group[], moreGroupsAvailable?: boolean }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [removedGroupIds, setRemovedGroupIds] = useState<string[]>([]);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const { showSuccess, showError } = useToast();

  const { leaveGroup, isLeavingGroup } = useLeaveGroup();

  // State to store all paginated responses with a ref to track what we've added
  const [paginatedPages, setPaginatedPages] = useState<Group[][]>([]);
  const lastProcessedPage = useRef<number>(0);

  // Debounce search query
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  // Fetch additional groups with pagination
  const { groupsData: paginatedGroups, loadMore, hasMore, isGroupsLoading, pageNumber } = useGroups();

  // Search groups
  const { searchResults, isSearchLoading } = useSearchGroups(debouncedSearchQuery);

  // Store loadMore in a ref to avoid observer re-creation
  const loadMoreRef = useRef(loadMore);
  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  // Check if we should enable pagination
  const canLoadMore = moreGroupsAvailable || hasMore;

  // Store paginated groups when they arrive (only once per page)
  useEffect(() => {
    if (
      paginatedGroups?.groups &&
      paginatedGroups.groups.length > 0 &&
      pageNumber > lastProcessedPage.current
    ) {
      lastProcessedPage.current = pageNumber;
      // This is a valid pattern for accumulating API responses
      setTimeout(() => {
        setPaginatedPages((prev) => [...prev, paginatedGroups.groups]);
      }, 0);

    }
  }, [paginatedGroups, pageNumber]);

  // Merge all groups: dashboard + all paginated pages
  const groups = useMemo(() => {
    const map = new Map<string, Group>();

    groupsData.forEach((g) => map.set(g.id, g));
    paginatedPages.flat().forEach((g) => map.set(g.id, g));

    // Filter out removed groups
    return Array.from(map.values()).filter(g => !removedGroupIds.includes(g.id));
  }, [groupsData, paginatedPages, removedGroupIds]);


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

  const handleLeaveGroup = useCallback(
    async (groupId: string) => {
      try {
        const response: LeaveGroupResponse = await leaveGroup(groupId);
        // Remove group from UI only after API success
        setRemovedGroupIds((prev) => [...prev, groupId]);
        showSuccess(response?.message || "Group left successfully");
      } catch (error) {
        const err = error as ApiError;
        showError(err.message || "Failed to leave group");
      } finally {
        setOpenMenuId(null);
      }
    },
    [leaveGroup, showSuccess, showError]
  );

  const handleGroupClick = useCallback((group: Group) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedGroup", JSON.stringify(group));
    }
    router.push("/group-info");
  }, [router]);

  const handleMenuClick = useCallback((groupId: string) => {
    setOpenMenuId(groupId);
  }, []);

  const handleMenuRef = useCallback((el: HTMLDivElement | null, groupId: string) => {
    menuRefs.current[groupId] = el;
  }, []);

  // Determine which groups to display
  const displayedGroups = useMemo(() => {
    // If user is actively searching (has typed something)
    if (debouncedSearchQuery.trim().length > 0) {
      return searchResults;
    }
    // Otherwise show all groups (dashboard + paginated)
    return groups;
  }, [debouncedSearchQuery, searchResults, groups]);


  // Use IntersectionObserver to detect when user scrolls to bottom
  // Only observe when not searching
  useEffect(() => {
    // Don't enable infinite scroll when searching
    if (debouncedSearchQuery.trim().length > 0) {
      return;
    }

    const observerElement = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && canLoadMore && !isGroupsLoading) {
          loadMoreRef.current();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    if (observerElement) {
      observer.observe(observerElement);
    }

    return () => {
      if (observerElement) {
        observer.unobserve(observerElement);
      }
    };
  }, [canLoadMore, isGroupsLoading, debouncedSearchQuery]);


  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] flex flex-col"
      style={{ height: "calc(100dvh - 120px)" }}
    >
      <Header title="Groups" hideBackButton />
      <div className="px-4 pb-4">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} showFilter={false} />
      </div>
      {/* Main Content Area - Groups List */}
      <div className="flex-1 bg-[var(--bg-card)] rounded-t-3xl overflow-hidden flex flex-col">
        {isSearchLoading ? (
          <div className="flex items-center justify-center h-full py-12">
            <Spinner size="m" color="var(--primary)" />
          </div>
        ) : displayedGroups.length === 0 ? (
          <div className="flex items-center justify-center h-full py-12">
            <p className="text-[var(--text-muted)]">
              {debouncedSearchQuery.trim().length > 0 ? "No groups found" : "No groups available"}
            </p>
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto px-4 py-2"
          >
            {displayedGroups.map((group) => (
              <GroupRow
                key={group.id}
                group={group}
                isMenuOpen={openMenuId === group.id}
                onGroupClick={handleGroupClick}
                onMenuClick={handleMenuClick}
                onLeaveGroup={handleLeaveGroup}
                menuRef={handleMenuRef}
                isLeavingGroup={isLeavingGroup}
              />
            ))}
            {/* Observer element to trigger load more - only when not searching */}
            {debouncedSearchQuery.trim().length === 0 && (
              <>
                <div ref={observerRef} className="h-1" />

                {isGroupsLoading && (
                  <div className="flex justify-center items-center pt-6">
                    <Spinner size="m" color="var(--primary)" />
                  </div>
                )}
              </>
            )}
            <div className="pb-[120px]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;
