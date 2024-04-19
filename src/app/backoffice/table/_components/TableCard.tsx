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
          height: "200px  ",
          p: 1,
        }}>
        <Box sx={{ position: "relative", width: "100%", height: "140px" }}>
          <Image
            src={imageUrl || ""}
            alt="menu image"
            layout="fill"
            objectFit="cover"
            priority={true}
            blurDataURL={imageUrl || ""}
            style={{ position: "absolute", borderRadius: "1rem" }}
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
            <Icon icon="material-symbols-light:table-bar" />
            <Typography color="primary">{name}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TableCard;
