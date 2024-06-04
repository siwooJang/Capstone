"use client"
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import axiosInstance from "../axiosInstance";
import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";

import { Chart } from "chart.js/auto"
import { Line,Pie,Doughnut } from 'react-chartjs-2';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(15),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  content: {
    marginBottom: theme.spacing(2),
  },
  result: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const useStyles2 = makeStyles(styles);

const DiaryDetail = ({ id }) => {

  const chartRef = useRef(null)

  useEffect(()=> {
    if(chartRef.current){
      if(chartRef.current.chart){
        chartRef.current.chart.destroy();
      }
    

    const context = chartRef.current.getContest("2d")

    const newChart = new Chart(context, {
      type: "doughnut",
      data: {
        labels: ['anger', 'sadness', 'anxiety', 'hurt', 'panic', 'happiness'],
        datasets: [
          {
          data: [10,20,30,40,50,60],
          backgroundColor: [
            "rgb(255,99,132,0.2)",
            "rgb(255,159,64,0.2)",
            "rgb(255,205,86,0.2)",
            "rgb(75,192,192,0.2)",
            "rgb(54,162,235,0.2)",
            "rgb(153,102,255,0.2)",
          ],
          borderColor: [
            "rgb(255,99,132)",
            "rgb(255,159,64)",
            "rgb(255,205,86)",
            "rgb(75,192,192)",
            "rgb(54,162,235)",
            "rgb(153,102,255)",
          ],
          borderWidth: 1,
        },
      ],
      },
      options: {
          responsive : true
      },
    });

    chartRef.current.chart = newChart;
  }
  }, []);

  

  const classes = useStyles();
  const classes2 = useStyles2();
  const [diary, setDiary] = useState(null);
  const [emotions, setEmotions] = useState(null);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axiosInstance.get(`/diary/detail/${id}`);
        setDiary(response.data);
      } catch (error) {
        console.error("Error fetching diary detail:", error);
      }
    };

    const fetchEmotions = async () => {
      try {
        const response = await axiosInstance.get(`/diary/emotion/${id}`);
        setEmotions(response.data);
        console.log("Emotions data:", response.data);  // 데이터 확인용
      } catch (error) {
        console.error("Error fetching diary emotions:", error);
      }
    };

    fetchDiary();
    fetchEmotions();
  }, [id]);

  const emotionData = {
    labels: emotions ? Object.keys(emotions) : [],
    datasets: [
      {
        label: 'Emotion Analysis',
        data: emotions ? Object.values(emotions) : [],
        fill: false,
        backgroundColor: [
          "rgb(255,99,132,0.2)",
          "rgb(255,159,64,0.2)",
          "rgb(255,205,86,0.2)",
          "rgb(75,192,192,0.2)",
          "rgb(54,162,235,0.2)",
          "rgb(153,102,255,0.2)",
        ],
        borderColor: [
          "rgb(255,99,132)",
          "rgb(255,159,64)",
          "rgb(255,205,86)",
          "rgb(75,192,192)",
          "rgb(54,162,235)",
          "rgb(153,102,255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  console.log("Emotion Data for Chart:", emotionData);  // 데이터 확인용

  if (!diary) {
    return <div>다이어리를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Deer AI Diary"
        rightLinks={<HeaderLinks />}
      />
      <div
        className={classes2.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes2.container}>
          <Container maxWidth="md" className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h4" className={classes.title}>
                {diary.title}
              </Typography>
              <Typography variant="body1" className={classes.content}>
                {diary.content}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                분석 결과
              </Typography>
              <div className={classes.result}>
                <Line data={emotionData} />
                <Pie data={emotionData}/>
                <Doughnut data={emotionData}/>
              </div>
              <Link href="/mypage" passHref>
                <Button variant="contained" color="primary">
                  목록으로 돌아가기
                </Button>
              </Link>
            </Paper>
          </Container>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}

export default DiaryDetail;
