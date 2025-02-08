import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

export enum Status {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  CLOSED = "closed",
}

export interface TimeEntry {
  id: number;
  startTime: string;
  endTime?: string;
}

export interface Issue {
  id: number;
  title: string;
  description?: string;
  status: Status;
  totalTimeSpent: string;
}

export interface CreateIssueDto {
  title: string;
}

export interface UpdateIssueDto {
  title?: string;
  description?: string;
  status?: string;
}

export const issueApi = {
  getIssues: async () => {
    const response = await api.get<Issue[]>("/issues");
    return response.data;
  },

  createIssue: async (issue: CreateIssueDto) => {
    const response = await api.post<Issue>("/issues", issue);
    return response.data;
  },

  updateIssue: async (id: number, data: UpdateIssueDto) => {
    const response = await api.patch<Issue>(`/issues/${id}`, data);
    return response.data;
  },

  deleteIssue: async (id: number): Promise<void> => {
    const response = await api.delete(`/issues/${id}`);
    return response.data;
  },

  startTimer: async (id: number) => {
    const response = await api.post<Issue>(`/issues/${id}/start`);
    return response.data;
  },

  stopTimer: async (id: number) => {
    const response = await api.post<Issue>(`/issues/${id}/stop`);
    return response.data;
  },
};
