import { Issue } from "@/api/issueApi";
import { IssueCard } from "./IssueCard";
import { Box, Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ISSUE_STATUSES, IssueStatus } from "@/constants/issueStatuses";

interface IssueListProps {
  issues: Issue[];
  statusFilter: IssueStatus | "all";
  onFilterChange: (status: IssueStatus | "all") => void;
  onIssuesChange: () => void;
}

export function IssueList({
  issues,
  statusFilter,
  onFilterChange,
  onIssuesChange,
}: IssueListProps) {
  const filteredIssues =
    statusFilter === "all"
      ? issues
      : issues.filter((issue) => issue.status === statusFilter);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          onChange={(_, newStatus) => {
            if (newStatus !== null) {
              onFilterChange(newStatus as IssueStatus | "all");
            }
          }}
          aria-label="issue status filter"
        >
          <ToggleButton value="all">All</ToggleButton>
          {Object.values(ISSUE_STATUSES).map((status) => (
            <ToggleButton key={status} value={status}>
              {status.replace("_", " ")}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={2}>
        {filteredIssues.map((issue) => (
          <Grid item xs={12} key={issue.id}>
            <IssueCard issue={issue} onIssuesChange={onIssuesChange} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
