"use client";

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const HeroContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: theme.spacing(4),
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
}));

const LeftContent = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
}));

const RightContent = styled(Box)(({ theme }) => ({
  width: "50%",
  display: "flex",
  justifyContent: "center",
}));

const HeroButtons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
  "& > *": {
    margin: theme.spacing(1),
  },
}));

const Hero = () => {
  return (
    <HeroContainer>
      <Container>
        <HeroContent>
          <LeftContent>
            <Typography variant="h2" textAlign={"left"}>
              Manage your menu catalog easily with Foodie POS
            </Typography>
            <Typography variant="h5">
              Entice your customers with QR code ordering system.
            </Typography>
            <HeroButtons>
              <Button variant="contained" color="secondary" size="large">
                Order App
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ color: "#000" }}
                size="large">
                Backoffice App
              </Button>
            </HeroButtons>
          </LeftContent>
          <RightContent>
            <Image
              src="/panda-cooking.png"
              alt="hero-img"
              width={400}
              height={410}
            />
          </RightContent>
        </HeroContent>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
