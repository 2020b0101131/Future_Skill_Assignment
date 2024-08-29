import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreateCard from "../Components/CreateCard";
import logo from "../img/sitelogo.png";
const HelpCenter = () => {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/getcards`,
          {
            title: searchTerm ? searchTerm : null,
          }
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [searchTerm]);

  return (
    <div>

      <AppBar
        style={{ color: "white", backgroundColor: "black" }}
        position="static"
      >
        
        
        <Toolbar style={{ justifyContent: "space-between" }}>
  <Box display="flex" alignItems="center">
    <img 
      src={logo} 
      alt="Company Logo" 
      style={{ width: '30px', height: 'auto', marginRight: '4px' }} 
    />
    <Typography sx={{ fontSize: "18px", fontFamily: "sans-serif" }}>
      Abstract | Help Center
    </Typography>
  </Box>
  <Button
    style={{ fontFamily: "sans-serif" }}
    variant="outlined"
    onClick={handleClickOpen}
    color="inherit"
  >
    Submit a request
  </Button>
</Toolbar>

      </AppBar>

   
      <div
        style={{
          backgroundColor: "#EBD3F8",
          textAlign: "center",
          paddingTop: "4rem",
          paddingBottom: "5rem",
        }}
      >
        <Typography style={{ fontFamily: "sans-serif" }} variant="h3">
          How can we help?
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            endAdornment: <ArrowForwardIcon />,
          }}
          style={{ marginTop: "20px", width: "40%", backgroundColor: "white" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        style={{
       
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
     
        <Grid
  container
  columnSpacing={9}
  sx={{
    mt: { lg: "40px", sm: "30px" },
    px: { xs: 2 },
    mb: { lg: "3rem", xs: "3rem" },
    mx: { lg: 'auto' }, 
    maxWidth: { lg: 'calc(100% - 28rem)', xs: '100%' }, 
    justifyContent: { xs: 'center', sm: 'flex-start' }, 
  }}
>
  {Array.isArray(cards) ? (
    cards.map((card, index) => (
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={index}>
        <Paper
          sx={{
            padding: "20px",
            textAlign: "left",
            width: { lg: "20rem", xs: "15rem" },
            height: "7rem",
            backgroundColor: "#EEEDEB",
            border: "1px solid lightgray",
            borderRadius: "8px",
            marginBottom: { lg: "1.8rem", sm: "2rem" },
            marginTop: "2.8rem",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "-3%",
              marginBottom: "1%",
              fontFamily: "sans-serif",
            }}
          >
            {card.title}
          </Typography>
          <Divider
            style={{
              backgroundColor: "lightgray",
              marginLeft: "-6%",
              marginRight: "-6%",
            }}
          />

          <Typography
            style={{ marginTop: "4px", fontFamily: "sans-serif" }}
          >
            {card.description}
          </Typography>
        </Paper>
      </Grid>
    ))
  ) : (
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
      <Paper
        style={{
          padding: "20px",
          textAlign: "left",
          width: "20rem",
          height: "7rem",
          backgroundColor: "#EEEDEB",
          border: "1px solid lightgray",
          borderRadius: "8px",
          marginBottom: "4.5rem",
          marginTop: "2.8rem",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            marginTop: "-3%",
            marginBottom: "1%",
          }}
        >
          {cards.title}
        </Typography>
        <Divider
          style={{
            backgroundColor: "lightgray",
            marginLeft: "-6%",
            marginRight: "-6%",
          }}
        />

        <Typography>{cards.description}</Typography>
      </Paper>
    </Grid>
  )}
</Grid>

       
      </div>

 
      <footer
        style={{ backgroundColor: "#000", color: "#fff", padding: "20px" }}
      >
        <Grid container spacing={15} sx={{display:"flex",justifyContent:"center"}} mt={2}>
          <Grid item xs={12} sm={4}>
            <Typography style={{fontFamily:"sans-serif",fontSize:"16px",fontWeight:"bold"}}>Abstract</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Branches</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography style={{fontFamily:"sans-serif",fontSize:"16px",fontWeight:"bold"}}>Resources</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Blog</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Help Center</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Release Notes</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Status</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography style={{fontFamily:"sans-serif",fontSize:"16px",fontWeight:"bold"}}>Community</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Twitter</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>LinkedIn</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Facebook</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Dribbble</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Podcast</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography style={{fontFamily:"sans-serif",fontSize:"16px",fontWeight:"bold"}}>Company</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>About Us</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Careers</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Legal</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px",fontWeight:"bold",marginTop:"15%"}}>Contact Us</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>info@abstract.com</Typography>
          </Grid>
          <Grid item xs={12} sm={4} mt={13.3}>
           
           
            <img 
        src={logo} 
        alt="Company Logo" 
        style={{ width: '25px', height: 'auto',marginLeft:"-4px" }} 
    />
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>© Copyright 2022</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>Abstract Studio Design, Inc.</Typography>
            <Typography style={{fontFamily:"sans-serif",fontSize:"14px"}}>All rights reserved</Typography>
          </Grid>
        </Grid>
      </footer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontWeight: "bold",
            marginTop: "-2%",
            marginBottom: "-2%",
            color: "white",
            backgroundColor: "black",
          }}
        >
          Create Card
        </DialogTitle>

        <DialogContent
          style={{
            marginTop: "6%",
            marginBottom: "-2%",
            marginLeft: "2%",
            marginRight: "2%",
          }}
        >
          <CreateCard />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "black" }} onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HelpCenter;
