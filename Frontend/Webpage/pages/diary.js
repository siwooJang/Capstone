import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";

import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";
import DiaryForm from '../components/DiaryForm';
import ProtectedRoute from './ProtectedRoute';

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const classes = useStyles();
  const { ...rest } = props;


  return (
    <>
    <ProtectedRoute>
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
        <div className={classes.container} >
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={8}>
              <DiaryForm/>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </ProtectedRoute>
    </>
  );
}
