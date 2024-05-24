import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Adb from "@material-ui/icons/Adb";
// core components
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import InfoArea from "/components/InfoArea/InfoArea.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk product</h2>
          <h5 className={classes.description}>
          저희 Deer AI 상담 서비스는 사용자 편의를 최우선으로 하여, <br/>일상 속에서 쉽게 접근할 수 있는 전문적인 심리 상담과 분석 기능을 제공합니다.
          <br/><br/><br/>
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Chatbot"
              description="AI 기반의 대화형 심리 상담 서비스를 통해 사용자에게 맞춤형 상담을 제공합니다.
              저희 서비스는 여러분의 정신 건강을 지키고, 보다 행복한 일상을 누릴 수 있도록 돕기 위해 최선을 다하고 있습니다."
              icon={Chat}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="일기 관리"
              description="사용자들이 일기를 편리하게 작성하고 과거의 기록을 손쉽게 돌아볼 수 있는 기능을 제공합니다. 여러분의 소중한 일상을 체계적으로 기록하고 관리할 수 있습니다."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="AI 심리분석"
              description="작성된 일기를 토대로 AI가 정밀한 심리 분석을 수행합니다. 이를 통해 사용자는 자신의 감정 상태를 보다 깊이 이해하고, 더 나은 정신 건강 관리를 할 수 있습니다."
              icon={Adb}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
