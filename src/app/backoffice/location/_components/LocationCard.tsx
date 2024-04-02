import React from "react";
import { Typography, Card, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Icon } from "@iconify/react";
import Link from "next/link";

interface Props {
  name: string;
  street: string;
  href: string;
}
const LocationCard = ({ name, street, href }: Props) => {
  return (
    <Link href={href}>
      <Card variant="outlined">
        <CardContent>
          <Box>
            <Icon icon="fa6-solid:map-location" />
          </Box>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{street}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard;
