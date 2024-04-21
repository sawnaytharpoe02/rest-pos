import React from "react";
import Link from "next/link";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface Props {
  name: string;
  imageUrl: string;
  href: string;
}

const TableCard = ({ name, imageUrl, href }: Props) => {
  return (
    <Link href={href} style={{ cursor: "pointer" }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "1rem",
          height: "200px",
          py: 2,
        }}>
        <Box sx={{ position: "relative", width: "100%", height: "130px" }}>
          <Image
            src={imageUrl || ""}
            alt="menu image"
            layout="fill"
            priority={true}
            blurDataURL={imageUrl || ""}
            style={{
              position: "absolute",
              borderRadius: "1rem",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
            }}>
            <Icon icon="material-symbols-light:table-bar" color="#63738180" />
            <Typography color="primary">{name}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TableCard;
