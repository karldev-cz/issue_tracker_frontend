import { Issue } from "../types/Issue";

export async function getIssues(): Promise<Issue[]> {
  
  const response = await fetch("/issues", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch issues");
  }

  return response.json();
}
