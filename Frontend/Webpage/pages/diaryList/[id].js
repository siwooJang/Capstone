import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Header from "/components/Header/Header.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Footer from "/components/Footer/Footer.js";
import styles from "/styles/jss/nextjs-material-kit/pages/loginPage.js";

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

const DiaryDetail = ({ diary },props) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { ...rest } = props;

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
          <Typography variant="body1">{diary.result}</Typography>
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

export async function getStaticProps({ params }) {
  // 임의의 데이터를 정의합니다.
  const dummyDiaries = [
    { id: '1', title: '첫 번째 일기', content: '첫 번째 일기 내용', result: '분석 결과 1' },
    { id: '2', title: '두 번째 일기', content: '두 번째 일기 내용', result: '분석 결과 2' }
  ];

  // params.id에 해당하는 diary를 찾습니다.
  const diary = dummyDiaries.find(diary => diary.id === params.id);

  return {
    props: {
      diary
    }
  };
}

export async function getStaticPaths() {
  // 동적 경로에 사용할 id 목록을 가져옵니다.
  const ids = ['1', '2']; // 예시로 임의의 id 목록을 사용하였습니다.

  // paths 배열을 생성합니다.
  const paths = ids.map((id) => ({
    params: { id }
  }));

  // paths와 fallback 옵션을 반환합니다.
  return {
    paths,
    fallback: false // 미리 정의된 경로 이외의 경로에 대한 요청은 404 페이지를 반환합니다.
  };
}

export default DiaryDetail;
