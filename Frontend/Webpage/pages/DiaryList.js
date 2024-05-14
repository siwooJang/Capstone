import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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
import Link from "next/link";
const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const diaries = [
    { id: 1, title: '첫 번째 일기', content: '첫 번째 일기 내용', result: '분석 결과 1',date:'2024-05-13' },
    { id: 2, title: '두 번째 일기', content: '두 번째 일기 내용', result: '분석 결과 2',date:'2024-05-14' },
    // 필요한 만큼 데이터를 추가할 수 있습니다.
  ];
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="AI DIARY"
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

              {diaries.map((diary) => (
                <GridItem key={diary.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="primary">{diary.title}</CardHeader>
                    <CardBody>
                      {diary.date}
                    </CardBody>
                    <CardFooter>
                      <Link href={`/diaryList/${diary.id}`}>
                        <a>
                          <Button color="primary" size="sm">일기 보기</Button>
                        </a>
                      </Link>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}

            </GridContainer>
          </div>

        <Footer whiteFont />
      </div>
    </div>
  );
}
