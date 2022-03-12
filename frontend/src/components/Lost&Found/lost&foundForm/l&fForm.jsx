import React, { useState } from 'react';
import { useStyles } from "../../_formData/FormUI/stylingComponent";
import { Box, Paper, Typography, } from "@mui/material";
import ButtonWrapper from '../../_formData/FormUI/ButtonWrapper';
import { TextfieldWrapper, SelectWrapper } from '../../_formData/FormUI/InputElement';
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import axios from "axios";
import UploadImage from '../../_formData/gettingFiles/uploadImage';
import { lostFoundCategories } from '../../_formData/formData';
// =================================================================================================================================================================================================================

const INITIAL_FORM_STATE = { adTitle: "", description: "", categories: "", images: "" };
const FORM_VALIDATION = Yup.object().shape({
    adTitle: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    categories: Yup.string().required("Required"),
    images: Yup.array().notRequired(),
});

// ======================================================================================================================================================================================================
function LostFoundForm() {

    //   const Navigate = useNavigate();
    //   const token = useSelector((state) => state.loginlogoutReducer.token);
    const [imagearray, setimagearray] = useState([]);
    console.log(imagearray);
    const onDrop = (pictures) => {
        setimagearray(pictures);
    };

    // ========================================================================================================================================================================================================
    //   const merge = async (values) => {
    //     try {
    //       // const response = 
    //       await axios.post(
    //         "http://localhost:5000/product_details",
    //         { images: imagearray, details: values },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       // console.log(response.data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    // =======================================================================================================================================================================================================
    const classes = useStyles();
    return (
        <>
            <Box className={classes.mainBoxSecond}>
                <Paper className={classes.paperStyleSecond}>
                    <Box className={classes.headingBoxSecond}>
                        <Typography className={classes.headingTextSecond}>Lost&Found Form</Typography>
                    </Box>
                    <Formik
                        initialValues={{ ...INITIAL_FORM_STATE }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={(values) => {
                            console.log(values);
                            //   setFormValue(values)
                            //   if (!phoneNumber && isLoggedIn) {
                            //     setContactModel(true);
                            //   } else if (phoneNumber && isLoggedIn) {
                            //     merge(values);
                            //     Navigate("/Profile");
                            //   }
                        }}
                    >
                        <Form>
                            <Box className={classes.ContentBoxSecond}>
                                <Typography className={classes.boldTextSecond}>Item name *</Typography>
                                <TextfieldWrapper
                                    name="adTitle"
                                    size="small"
                                    helperText="Mention the key features of your item (e.g. brand, model, type)"
                                />
                                <Typography className={classes.boldTextSecond}>Discription *</Typography>
                                <TextfieldWrapper
                                    name="description"
                                    helperText="Please provide proper detail of item with contact details  "
                                    multiline={true}
                                    rows={4}
                                />
                                <Typography className={classes.boldTextSecond}>Select a category *</Typography>
                                <SelectWrapper
                                    categories={lostFoundCategories}
                                    name="categories"
                                    size="small"
                                    helperText="Please select your category"
                                />
                                <Typography className={classes.boldTextSecond}>Upload Images</Typography>
                                <UploadImage name="images" onDrop={onDrop} />
                                <ButtonWrapper >Submit Form</ButtonWrapper>
                            </Box>
                        </Form>
                    </Formik>   
                </Paper>
            </Box>
        </>
    )
}

export default LostFoundForm;














