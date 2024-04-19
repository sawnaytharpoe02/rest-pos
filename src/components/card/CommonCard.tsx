import React from "react";
import { Typography, Card, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  name: string;
  href: string;
  street?: string;
  imageUrl?: string;
}
const CommonCard = ({ name, street, href, imageUrl }: Props) => {
  return (
    <Link href={href}>
      <Card variant="outlined">
        {imageUrl && (
          <Box sx={{ position: "relative", width: "100%", height: "150px" }}>
            <Image
              src={imageUrl || ""}
              alt="menu image"
              layout="fill"
              objectFit="cover"
              priority={true}
              blurDataURL={imageUrl || ""}
              style={{ position: "absolute" }}
            />
          </Box>
        )}
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
