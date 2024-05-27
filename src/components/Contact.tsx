"use client";

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ContactContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.background.default,
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ContactForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Contact = () => {
  return (
    <ContactContainer>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ContactInfo>
              <Typography variant="h6">Our Address</Typography>
              <Typography variant="body1">
                123 Food Street, Food City, FC 12345
              </Typography>
            </ContactInfo>
            <ContactInfo>
              <Typography variant="h6">Email Us</Typography>
              <Typography variant="body1">support@foodorderapp.com</Typography>
            </ContactInfo>
            <ContactInfo>
              <Typography variant="h6">Call Us</Typography>
              <Typography variant="body1">(123) 456-7890</Typography>
            </ContactInfo>
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactForm>
              <TextField variant="outlined" label="Name" fullWidth required />
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                fullWidth
                required
              />
              <TextField
                variant="outlined"
                label="Message"
                multiline
                rows={4}
                fullWidth
                required
              />
              <SubmitButton variant="contained" type="submit">
                Send Message
              </SubmitButton>
            </ContactForm>
          </Grid>
        </Grid>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
