import { Box, Card, CardContent, Skeleton, Grid } from "@mui/material";

export function IssuesSkeleton() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map((index) => (
        <Grid item xs={12} key={index}>
          <Card>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Skeleton variant="text" width="40%" height={32} />
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Skeleton variant="rounded" width={80} height={32} />
                  <Skeleton variant="circular" width={32} height={32} />
                </Box>
              </Box>
              <Skeleton variant="text" width="60%" />
              <Box
                sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}
              >
                <Skeleton variant="rounded" width={120} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="rounded" width={80} height={40} />
                <Skeleton variant="text" width={120} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
