'use client'

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const testimonials = [
  {
    name: "Tom",
    company: "Tasty Foods Co. Ltd",
    avatar: "/pic1.jpeg",
    description: `We increased our sale by 120% during the first 3 months of using Foodie POS. Easy and simple to use. 
      Super duper recommended for everyone who are less tech savy. 5/5`,
  },
  {
    name: "Hailey",
    company: "Waa T Co. Ltd",
    avatar: "/pic2.jpeg",
    description: `Our customers love Foodie POS. Quick and easy with QR code ordering. We now spend more time taking 
      care of our customers instead of taking orders manually. Thanks to Foodie POS!`,
  },
  {
    name: "Zen",
    company: "Swey Mel Co. Ltd",
    avatar: "/pic3.jpeg",
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
    Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
];

const TestimonialsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.background.default,
}));

const Testimonials = () => {
  return (
    <TestimonialsContainer>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar src={testimonial.avatar} alt={testimonial.name} />
                  }
                  title={testimonial.name}
                  subheader={testimonial.company}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {testimonial.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </TestimonialsContainer>
  );
};

export default Testimonials;
