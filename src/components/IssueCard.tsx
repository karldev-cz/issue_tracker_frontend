"use client";

import { Issue, issueApi, Status } from "@/api/issueApi";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Typography,
  IconButton,
} from "@mui/material";
import { ISSUE_STATUSES } from "@/constants/issueStatuses";
import { DeleteOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Notification } from "./Notification";
import { AxiosError } from "axios";

interface IssueCardProps {
  issue: Issue;
  onIssuesChange?: () => void;
}

export function IssueCard({ issue, onIssuesChange }: IssueCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<Status>(issue.status);
  const [isRunning, setIsRunning] = useState(issue.isRunning);
  const [totalTimeSpent, setTotalTimeSpent] = useState(issue.totalTimeSpent);

  useEffect(() => {
    const checkTimerStatus = async () => {
      try {
        const { isRunning: currentIsRunning } = await issueApi.getIssueStatus(
          issue.id
        );
        setIsRunning(currentIsRunning);
      } catch (error) {
        console.error("Failed to check timer status:", error);
      }
    };

    checkTimerStatus();
  }, [issue.id]);

  const handleStatusChange = async (issueId: number, newStatus: string) => {
    try {
      await issueApi.updateIssue(issueId, { status: newStatus });
      setCurrentStatus(newStatus as Status);
      onIssuesChange?.();
    } catch (error) {
      console.error("Failed to update status:", error);
      setError("Failed to update status");
    }
  };

  const handleTimer = async (issueId: number, action: "start" | "stop") => {
    try {
      if (action === "start") {
        await issueApi.startTimer(issueId);
        setIsRunning(true);
      } else {
        const updatedIssue = await issueApi.stopTimer(issueId);
        setIsRunning(false);
        setTotalTimeSpent(updatedIssue.totalTimeSpent);
        onIssuesChange?.();
      }
    } catch (error) {
      console.error("Failed to handle timer:", error);
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Failed to handle timer";
      setError(errorMessage);
    }
  };

  const handleDelete = async (issueId: number) => {
    try {
      await issueApi.deleteIssue(issueId);
      onIssuesChange?.();
    } catch (error) {
      console.error("Failed to delete issue:", error);
      setError("Failed to delete issue");
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">{issue.title}</Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip label={issue.status} color="primary" />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(issue.id)}
                sx={{
                  ml: 1,
                  backgroundColor: "#ff000014",
                  "&:hover": {
                    backgroundColor: "#ff000029",
                  },
                }}
              >
                <DeleteOutline />
              </IconButton>
            </Box>
          </Box>

          {issue.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {issue.description}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControl size="small">
              <Select
                value={currentStatus}
                onChange={(e) => handleStatusChange(issue.id, e.target.value)}
              >
                {Object.values(ISSUE_STATUSES).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.replace("_", " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="success"
              onClick={() => handleTimer(issue.id, "start")}
              sx={{ textTransform: "none" }}
              disabled={isRunning}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleTimer(issue.id, "stop")}
              sx={{ textTransform: "none" }}
              disabled={!isRunning}
            >
              Stop
            </Button>

            <Typography>Total time: {totalTimeSpent}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Notification
        open={!!error}
        message={error || ""}
        onClose={() => setError(null)}
        severity="error"
      />
    </>
  );
}
