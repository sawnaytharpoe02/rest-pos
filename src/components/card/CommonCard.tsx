import React from "react";
import { Typography, Card, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Props {
  name: string;
  href: string;
  street?: string;
}
const CommonCard = ({ name, street, href }: Props) => {
  return (
    <Link href={href}>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <Icon icon="fa6-solid:map-location" color="#63738180" />
          </Box>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          {street && <Typography variant="body2">{street}</Typography>}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CommonCard;
