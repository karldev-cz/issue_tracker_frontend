"use client";

import { Issue, issueApi } from "@/api/issueApi";
import { useEffect, useState } from "react";
import { NewIssueForm } from "./NewIssueForm";
import { IssueList } from "./IssueList";
import { Box, Container, Typography } from "@mui/material";
import { IssueStatus } from "@/constants/issueStatuses";
import { IssuesSkeleton } from "./IssuesSkeleton";

export function IssuesContainer() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);

  const loadIssues = async () => {
    setIsLoading(true);
    try {
      const data = await issueApi.getIssues();
      setIssues(data);
    } catch (error) {
      console.error("Failed to load issues:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssuesChange = () => {
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

      {isLoading ? (
        <IssuesSkeleton />
      ) : (
        <IssueList
          issues={issues}
          statusFilter={statusFilter}
          onFilterChange={setStatusFilter}
          onIssuesChange={handleIssuesChange}
        />
      )}
    </Container>
  );
}
