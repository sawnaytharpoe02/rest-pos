import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  href: string;
  title: string;
  subTitle?: string;
}

const MenuCategoryCard = ({ icon, href, title, subTitle }: Props) => {
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
          <Typography variant="body2">{subTitle}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCategoryCard;
