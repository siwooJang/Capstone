import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "./axiosInstance";
import { useRouter } from "next/router";
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

export default function RegisterPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const router = useRouter();
  const { register, handleSubmit, watch,formState: { errors }, setError } = useForm();
  const password = watch("password");
  
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/signup/", {
        username: data.name,
        password: data.password
      });

      if (response.status === 201) {
        console.log('Registration successful, redirect to login page');
        router.push("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred during registration", error);
      if (error.response && error.response.data) {
        console.log(error.response.data); // 서버에서 반환된 오류 메시지를 출력
        if (error.response.data.username) {
          setError("name", {
            type: "manual",
            message: error.response.data.username[0],
          });
        }
      }
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
                      <h4>Register</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Username"
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
                          ...register('name', { required: true })
                        }}
                      />
                      {errors.name && <span>This field is required</span>}
                      <CustomInput
                        labelText="Password"
                        id="password"
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
                          ...register('password', { required: true })
                        }}
                      />
                      {errors.password && <span>This field is required</span>}
                      <CustomInput
                        labelText="Confirm Password"
                        id="passwordVerification"
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
                          ...register('passwordVerification', {
                            required: true,
                            validate: value =>
                              value === password || "The passwords do not match"
                          })
                        }}
                      />
                      {errors.passwordVerification && <span>{errors.passwordVerification.message}</span>}
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button simple color="primary" size="lg" type="submit">
                        Register
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
