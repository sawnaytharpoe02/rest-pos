import React from "react";
import Link from "next/link";
import { Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";

interface Props {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  href: string;
}

const MenuCard = ({ name, description, price, imageUrl, href }: Props) => {
  return (
    <Link href={href} style={{ cursor: "pointer" }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "1rem",
          height: "250px",
          border: 0,
        }}>
        <Box sx={{ position: "relative", width: "100%", height: "150px" }}>
          <Image
            src={imageUrl || "/default_menu.jpg"}
            alt="menu image"
            layout="fill"
            objectFit="cover"
            priority={true}
            blurDataURL={imageUrl || "/default_menu.jpg"}
            style={{ position: "absolute", borderRadius: "1rem" }}
          />
        </Box>
        <CardContent sx={{ py: 1 }}>
          <Typography
            sx={{
              fontSize: 20,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            color="primary"
            gutterBottom>
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}>
            {description}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            ${price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
