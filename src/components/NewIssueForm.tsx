"use client";

import { issueApi } from "@/api/issueApi";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface NewIssueFormProps {
  onIssueCreated: () => void;
}

export function NewIssueForm({ onIssueCreated }: NewIssueFormProps) {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await issueApi.createIssue({ title });
      setTitle("");
      onIssueCreated();
    } catch (error) {
      console.error("Failed to create issue:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 4, display: "flex", gap: 2 }}
    >
      <TextField
        label="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button type="submit" variant="contained">
        Create Issue
      </Button>
    </Box>
  );
}
