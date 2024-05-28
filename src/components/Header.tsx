"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  boxShadow: "none",
}));

const Logo = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontSize: "1.5rem",
  fontWeight: "bold",
  cursor: "pointer",
}));

const HeaderButtons = styled(Box)(({ theme }) => ({
  "& > *": {
    marginRight: theme.spacing(4),
    gap: theme.spacing(2),
    color: "#000",
  },
}));

const Header = () => {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Logo variant="h6">Forklore</Logo>
        <HeaderButtons>
          <a
            href="#"
            color="inherit"
            style={{ color: "#000", cursor: "pointer" }}>
            Home
          </a>
          <a
            href="#features"
            color="inherit"
            style={{ color: "#000", cursor: "pointer" }}>
            Features
          </a>
          <a
            href="#testimonials"
            color="inherit"
            style={{ color: "#000", cursor: "pointer" }}>
            Testimonials
          </a>
          <a
            href="#contact"
            color="inherit"
            style={{ color: "#000", cursor: "pointer" }}>
            Contact
          </a>
          <Button variant="contained" color="secondary" sx={{ color: "#fff" }}>
            Get Started
          </Button>
        </HeaderButtons>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
