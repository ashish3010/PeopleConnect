import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { get, del } from "@/src/network";
import { GroupsResponse } from "./types";

const useGroups = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: groupsData,
    isLoading: isGroupsLoading,
    error: groupsError,
    isSuccess,
    refetch,
  } = useQuery<GroupsResponse>({
    queryKey: ["groups", pageNumber],
    queryFn: async () => {
      const response = await get<GroupsResponse>(`/groups/${pageNumber}`);
      return response.data;
    },
    retry: 0,
    staleTime: 15 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    enabled: false, // Don't call on mount
  });

  // Increment page number and trigger fetch
  const loadMore = () => {
    if (isSuccess && groupsData?.moreGroupsAvailable) {
      setPageNumber((prev) => prev + 1);
    } else {
      refetch();
    }
  };

  return {
    groupsData,
    isGroupsLoading,
    groupsError,
    loadMore,
    pageNumber,
    hasMore: groupsData?.moreGroupsAvailable || false,
  };
};

// Hook for searching groups
export const useSearchGroups = (searchQuery: string) => {
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useQuery<GroupsResponse>({
    queryKey: ["groups-search", searchQuery],
    queryFn: async () => {
      const response = await get<GroupsResponse>(`/groups/search/${encodeURIComponent(searchQuery)}`);
      return response.data;
    },
    retry: 0,
    staleTime: 0,
    gcTime: 0,
    enabled: searchQuery.length > 0,
  });

  return {
    searchResults: searchData?.groups || [],
    isSearchLoading,
    searchError,
  };
};

// Hook for leaving a group
export const useLeaveGroup = () => {
  const { mutateAsync: leaveGroup, isPending: isLeavingGroup } = useMutation({
    mutationFn: async (groupId: string) => {
      const response = await del(`/groups/${groupId}/leave`);
      return response.data;
    },
  });

  return {
    leaveGroup,
    isLeavingGroup,
  };
};

export default useGroups;