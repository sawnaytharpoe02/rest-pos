import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, Box } from "@mui/material";
import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  href: string;
  title: string;
  isRequired: boolean | null;
}

const CommonAddonCard = ({ icon, href, title, isRequired }: Props) => {
  return (
    <Link href={href} style={{ cursor: "pointer" }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "1rem",
          ":hover": {
            backgroundColor: "primary.lighter",
            color: "primary.dark",
          },
        }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="primary" gutterBottom>
            {icon}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          {isRequired !== null && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">require</Typography>
              <Box
                sx={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: isRequired ? "green" : "red",
                }}></Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CommonAddonCard;
