import { useQuery } from "@tanstack/react-query";
import { get } from "@/src/network";
import { DashboardResponse } from "./types";
import { clearSessionStorage } from "@/src/utils/functions";

const useDashboard = () => {
    const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      clearSessionStorage();
      const response = await get<DashboardResponse>("/dashboard");
      
      if (response.data.userInfo?.email) {
        sessionStorage.setItem("user_email", response.data.userInfo.email);
      }
      
      return response.data;
    },
    retry: 2, // Retry twice on failure (3 attempts total)
    staleTime: 15 * 60 * 1000, // Data remains fresh for 15 minutes
    gcTime: 15 * 60 * 1000, // Cache persists for 15 minutes
  });

  const dashboard = {
    dashboardData: dashboardData,
    isDashboardLoading: isDashboardLoading,
    dashboardError: dashboardError,
  };

  return dashboard;
};

export default useDashboard;