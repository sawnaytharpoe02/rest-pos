"use client";

import React from "react";
import { Box, Container, Typography, Button, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

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
}));

const HeroButtonContained = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  padding: "10px 20px",
  fontSize: "16px",
  marginRight: "10px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const HeroButtonOutlined = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.dark}`,
  color: theme.palette.primary.main,
  padding: "10px 20px",
  fontSize: "16px",
}));

const Hero = () => {
  return (
    <HeroContainer>
      <Container>
        <Slide
          direction="up"
          in={true}
          timeout={1000}
          style={{ transitionDuration: "1000ms" }}>
          <HeroContent>
            <LeftContent>
              <Typography variant="h2" textAlign={"left"}>
                Manage your menu catalog easily with Forklore
              </Typography>
              <Typography variant="h5">
                Entice your customers with QR code ordering system.
              </Typography>
              <HeroButtons>
                <Link href={"order/tabledId=1"}>
                  <HeroButtonContained>Order App</HeroButtonContained>
                </Link>
                <Link href={"backoffice/orders"}>
                  <HeroButtonOutlined>Backoffice App</HeroButtonOutlined>
                </Link>
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
        </Slide>
      </Container>
    </HeroContainer>
  );
};

export default Hero;
