import CachedIcon from "@mui/icons-material/Cached";
import axios from "axios";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";

import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.css";

const CreateCard = () => {
  const [rowss, setRowss] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [btnText, setBtnText] = useState("Save");
  const [isReadable, setIsReadable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const title = "Create Card";

  const validationSchema = yup.object({
    cardTitle: yup.string().required("Title is required"),
    cardDescription: yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      cardTitle: "",
      cardDescription: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSelectedRow(null);
      setIsSubmitted(true);

      setBtnText("Saving");

      let postData = {
        title: values.cardTitle,
        description: values.cardDescription,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}/cards`, postData)
        .then((response) => {
          if (response.data.statusCode === 201) {
            setBtnText("Saving");
            new Notify({
              status: "success",
              text: response.data.message,
              effect: "slide",
            });
            formik.resetForm();
          } else {
            console.log("Response is not 201");
          }
        })
        .catch((error) => {
          console.log("Error in create api");
        })
        .finally(() => {
          setBtnText("Save");
          setIsSubmitted(false);
        });
    },
  });

  const handleCancel = () => {
    setBtnText("Save");
    setIsSubmitted(false);
    setSelectedRow(null);
    formik.resetForm();
  };

  return (
    <>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          type="text"
          id="cardTitle"
          name="cardTitle"
          label="Title"
          size="small"
          required
          value={formik.values.cardTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cardTitle && !!formik.errors.cardTitle}
          helperText={formik.touched.cardTitle && formik.errors.cardTitle}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
            },
            width: "100%",
          }}
        />

        <TextField
          margin="normal"
          fullWidth
          type="text"
          id="cardDescription"
          name="cardDescription"
          label="Card Description"
          size="large"
          multiline
          rows={4}
          required
          value={formik.values.cardDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.cardDescription && !!formik.errors.cardDescription
          }
          helperText={
            formik.touched.cardDescription && formik.errors.cardDescription
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "5px",
            },
            width: "100%",
          }}
        />

        <Box spacing={2} sx={{ mt: 3, textAlign: "center" }}>
          <Button
            sx={{
              minWidth: 100,
              ml: 1,
              mt: { xs: 1, md: 0 },
              color: "white",
              backgroundColor: "black",
              ":hover": { backgroundColor: "gray" },
            }}
            disabled={isSubmitted}
            variant="contained"
            type="submit"
          >
            {btnText}
            &nbsp;
          </Button>
          <Button
            type="button"
            sx={{
              minWidth: 100,
              ml: 1,
              mt: { xs: 1, md: 0 },
              color: "black",
              border: "1px solid black",
              ":hover": { color: "white", backgroundColor: "lightgray" },
            }}
            onClick={handleCancel}
            variant="outlined"
          >
            <CachedIcon />
            &nbsp;RESET
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateCard;
