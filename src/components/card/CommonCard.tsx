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
  isRequired?: boolean;
  icon: string;
  isAvailable?: boolean;
}
const CommonCard = ({
  name,
  street,
  href,
  imageUrl,
  isRequired,
  icon,
  isAvailable,
}: Props) => {
  return (
    <Link href={href}>
      <Card
        variant="outlined"
        sx={{
          opacity: isAvailable !== undefined ? (isAvailable ? 1 : 0.4) : 1,
          borderRadius: "1rem",
          ":hover": {
            backgroundColor: "primary.lighter",
            color: "primary.dark",
          },
        }}>
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
            <Icon icon={icon} fontSize={20} color="#63738180" />
          </Box>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          {street && <Typography variant="body2">{street}</Typography>}
          {isRequired !== undefined && (
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

export default CommonCard;
