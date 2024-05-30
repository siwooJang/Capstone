import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "./axiosInstance";
import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { loginSuccess } from './slices/authSlice';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardHeader from "/components/Card/CardHeader.js";
import CardFooter from "/components/Card/CardFooter.js";
import CustomInput from "/components/CustomInput/CustomInput.js";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import NoAuthRoute from './NoAuthRoute';


const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/", {
        username: data.name,
        password: data.password
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;
        sessionStorage.setItem("accessToken", access);
        sessionStorage.setItem("refreshToken", refresh);
        dispatch(loginSuccess({ username: data.name }));
        router.push('/chatbot'); // Redirect to chatbot or any protected route
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login", error);
    }
  };

  return (
    <>
    <NoAuthRoute>
    <div>
      <Header
        absolute
        color="transparent"
        brand="Deer AI Diary"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        ...register("name", { required: true })
                      }}
                    />
                    {errors.name && <span>This field is required</span>}
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        ...register("password", { required: true })
                      }}
                    />
                    {errors.password && <span>This field is required</span>}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
    </NoAuthRoute>
    </>
  );
}
