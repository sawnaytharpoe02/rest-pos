"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(6, 0),
}));

const FooterSection = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SocialIcon = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.common.white,
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(1),
  "& .MuiOutlinedInput-root": {
    color: theme.palette.common.white,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.common.white,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.common.white,
  },
}));

const NewsletterButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FooterSection variant="h6">Contact Us</FooterSection>
            <Typography variant="body1">
              123 Food Street, Food City, FC 12345
            </Typography>
            <Typography variant="body1">
              Email: support@foodorderapp.com
            </Typography>
            <Typography variant="body1">Phone: (123) 456-7890</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterSection variant="h6">Quick Links</FooterSection>
            <Link href="#" color="inherit">
              Home
            </Link>
            <br />
            <Link href="#" color="inherit">
              Features
            </Link>
            <br />
            <Link href="#" color="inherit">
              Testimonials
            </Link>
            <br />
            <Link href="#" color="inherit">
              Contact Us
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterSection variant="h6">Follow Us</FooterSection>
            <Box>
              <SocialIcon href="#">Facebook</SocialIcon>
              <SocialIcon href="#">Twitter</SocialIcon>
              <SocialIcon href="#">Instagram</SocialIcon>
            </Box>
            <FooterSection variant="h6">Newsletter</FooterSection>
            <Box display="flex">
              <NewsletterInput
                variant="outlined"
                size="small"
                placeholder="Your email"
              />
              <NewsletterButton variant="contained">Subscribe</NewsletterButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
