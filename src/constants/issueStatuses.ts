export const ISSUE_STATUSES = {
  open: "open",
  in_progress: "in_progress",
  closed: "closed",
} as const;

export type IssueStatus = (typeof ISSUE_STATUSES)[keyof typeof ISSUE_STATUSES];
