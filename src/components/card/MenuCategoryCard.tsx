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
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {icon}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">{subTitle}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCategoryCard;
