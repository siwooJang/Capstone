import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CardFooter from "/components/Card/CardFooter.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our Team</h2>
      <br/><br/>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  // src="/img/faces/avatar.jpg"
                  src="https://i.postimg.cc/QtmLtsNp/image.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                강인창
                <br />
                <small className={classes.smallTitle}>AI</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                프로젝트 팀장을 맡았습니다. <br/>
                감정 분석 AI를 위한 데이터 수집 및 학습을 진행 및 전체적인 서버 구축을 했습니다.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/ScobraCK"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  // src="/img/faces/christian.jpg"
                  src="https://i.postimg.cc/QtmLtsNp/image.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                김태원
                <br />
                <small className={classes.smallTitle}>BackEnd</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                DRF를 통해 REST API를 제작하고 <br/>프로젝트에 사용될 DB 구조를 <br/>설계 및 MySQL로 구축했습니다.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/UserKimTaewon"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  // src="/img/faces/kendall.jpg"
                  src="https://i.postimg.cc/QtmLtsNp/image.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                장시우
                <br />
                <small className={classes.smallTitle}>FrontEnd</small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  웹사이트를 디자인,구성하고 <br/>백엔드,AI와 연동작업을 진행했습니다. <br/>
                  컴포넌트 UI 디자인 및 챗봇을 구축했습니다.
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                  href="https://github.com/siwooJang"
                >
                  <i className={classes.socials + " fab fa-github"} />
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        
      </div>
    </div>
  );
}
