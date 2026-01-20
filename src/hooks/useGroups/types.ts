import { Group } from "../useDashboard/types";

export interface GroupsResponse {
  status: boolean;
  message: string;
  groups: Group[];
  moreGroupsAvailable: boolean;
}

export interface LeaveGroupResponse {
  status: boolean;
  message: string;
}