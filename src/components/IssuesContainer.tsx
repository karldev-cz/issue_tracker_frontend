"use client";

import { Issue, issueApi } from "@/api/issueApi";
import { useEffect, useState } from "react";
import { NewIssueForm } from "./NewIssueForm";
import { IssueList } from "./IssueList";
import { Box, Container, Typography } from "@mui/material";
import { IssueStatus } from "@/constants/issueStatuses";

export function IssuesContainer() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all");

  const loadIssues = async () => {
    const data = await issueApi.getIssues();
    setIssues(data);
  };

  const handleIssueDeleted = () => {
    loadIssues();
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Issue Tracker
      </Typography>

      <Box sx={{ mb: 4 }}>
        <NewIssueForm onIssueCreated={loadIssues} />
      </Box>

      <IssueList
        issues={issues}
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
        onIssueDeleted={handleIssueDeleted}
      />
    </Container>
  );
}
