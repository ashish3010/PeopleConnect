export interface UserInfo {
  name: string;
  email: string;
  image: string;
  department: string;
  organization: string;
  designation: string;
  linkedin: string;
  github: string;
  website: string;
  whatsapp: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  membersCount: number;
}

export interface DashboardResponse {
  status: boolean;
  message: string;
  userInfo: UserInfo;
  groups: Group[];
  moreGroupsAvailable: boolean;
}