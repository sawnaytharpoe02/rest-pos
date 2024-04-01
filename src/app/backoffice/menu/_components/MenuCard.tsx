import React from "react";
import Link from "next/link";
import { Card, CardContent, Typography } from "@mui/material";
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
          ":hover": {
            backgroundColor: "primary.lighter",
            color: "primary.dark",
          },
        }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="primary" gutterBottom>
            <img src={imageUrl || ""} alt="menu image" />
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography variant="body2">{price}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
