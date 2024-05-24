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

const DiaryDetail = ({ diary }, props) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { ...rest } = props;

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
                <Typography variant="body1">Anger: {diary.emotion.anger}</Typography>
                <Typography variant="body1">Sadness: {diary.emotion.sadness}</Typography>
                <Typography variant="body1">Anxiety: {diary.emotion.anxiety}</Typography>
                <Typography variant="body1">Hurt: {diary.emotion.hurt}</Typography>
                <Typography variant="body1">Panic: {diary.emotion.panic}</Typography>
                <Typography variant="body1">Happiness: {diary.emotion.happiness}</Typography>
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
  const dummyDiaries = [
    {
      id: 7,
      title: "왜 나만 항상 이렇게 되는 걸까?",
      content:
        "오늘 정말 화가 난다. 왜 나만 항상 이렇게 되는 걸까? 회사에서 상사가 내게 불필요한 일을 시키고, 내가 얼마나 바쁜지 전혀 신경 쓰지 않는 것 같았다. 나는 매일 최선을 다하고 있는데, 왜 내 노력은 항상 인정받지 못하는 걸까? 내가 실수를 한 것도 아니고, 오히려 다른 사람들의 실수를 내가 뒷수습하고 있는데 말이다. 정작 그 사람들은 아무 일 없다는 듯이 웃고 떠드는 모습을 보니 더욱 분노가 치밀어 올랐다. 참을 수가 없어서 점심시간에 잠깐 나가서 바람을 쐬며 진정하려 했지만, 마음은 가라앉지 않았다. 오늘 하루 종일 속이 끓어올라서 일을 제대로 할 수가 없었다. 왜 사람들은 이렇게 내 마음을 이해하지 못하는 걸까? 왜 나는 항상 이런 상황에 처해야 하는 걸까? 분노가 계속해서 나를 잠식해 들어가는 것 같다. 정말 힘들다.",
      date: "2024-05-15",
      emotion: {
        anger: 0.776,
        sadness: 0.666,
        anxiety: 0.425,
        hurt: 0.562,
        panic: 0.515,
        happiness: 0.083,
      },
    },
    {
      id: 8,
      title: "내 마음의 무게",
      content:
        "오늘은 마음이 너무 무겁다. 아침부터 이유 없이 눈물이 났다. 아마도 요즘 계속 쌓여왔던 스트레스와 외로움이 폭발한 것 같다. 친구들과 가족들과의 소통이 단절된 것처럼 느껴진다. 다들 바쁘고, 나 또한 바쁜 생활 속에서 서로의 안부를 묻는 것조차 잊고 지냈다. 그런 생각을 하니 더 슬퍼졌다. 점심시간에 혼자 카페에 앉아 창밖을 바라보며 지난 추억들을 떠올렸다. 그때는 왜 그리 행복했던 걸까? 왜 지금은 이렇게 마음이 텅 빈 것 같을까? 사랑하는 사람들과 함께했던 시간들이 그립다. 그들은 여전히 내 곁에 있지만, 마음은 멀어진 것 같다. 내가 더 다가가야 하는 걸까? 아니면 시간이 해결해 줄까? 너무나 슬프고, 이 슬픔을 어떻게 이겨낼 수 있을지 모르겠다. 오늘 밤도 잠이 오지 않을 것 같다.",
      date: "2024-05-15",
      emotion: {
        anger: 0.477,
        sadness: 0.814,
        anxiety: 0.621,
        hurt: 0.537,
        panic: 0.449,
        happiness: 0.075,
      },
    },
    {
      id: 9,
      title: "내일은 또 어떻게 될까?",
      content:
        "요즘 들어 매일 불안감에 시달리고 있다. 내일은 또 어떻게 될까? 직장에서의 불확실한 상황, 개인적인 문제들, 그리고 건강까지 신경 쓸 게 너무 많다. 밤마다 잠이 오지 않아 뒤척이기 일쑤다. 오늘도 겨우 두 시간 정도밖에 못 잔 것 같다. 아침에 일어나서도 머리가 무겁고, 하루 종일 집중이 안 된다. 작은 일에도 과민하게 반응하게 되고, 나 자신에게 실망하게 된다. 이렇게 계속 살아가도 괜찮은 걸까? 모두들 나만큼 불안한 걸까? 아니면 나만 유독 이런 걸까? 가족들에게도 이런 걱정을 털어놓기가 어렵다. 그들도 각자 나름의 문제로 힘들어하는데, 내가 또 짐이 될 수는 없지 않은가. 이 불안에서 벗어날 수 있는 방법이 있을까? 마음의 평화를 찾고 싶다. 이대로는 안 될 것 같다.",
      date: "2024-05-15",
      emotion: {
        anger: 0.609,
        sadness: 0.469,
        anxiety: 0.794,
        hurt: 0.443,
        panic: 0.537,
        happiness: 0.164,
      },
    },
    {
      id: 10,
      title: "믿었던 사람에게",
      content:
        "오늘은 마음에 큰 상처를 받았다. 믿고 의지했던 친구에게 배신당했다는 생각이 든다. 우리가 함께 나눈 시간들, 비밀들, 그리고 약속들이 한순간에 무너진 것 같다. 그 친구가 다른 사람들에게 내 이야기를 했다는 사실을 알게 되었다. 나는 너무 충격적이었다. 어떻게 그런 일을 할 수 있는 걸까? 내가 그동안 얼마나 그 친구를 신뢰했는지 모를 리 없을 텐데. 가슴이 찢어지는 듯한 느낌이다. 사람을 믿는 게 이렇게 어려운 일인지 다시 한 번 깨닫게 되었다. 이 상처를 어떻게 치유해야 할지 모르겠다. 다시는 아무도 믿지 말아야겠다는 생각이 들지만, 그게 가능할까? 마음 한 구석에서는 여전히 친구를 용서하고 싶다는 생각도 든다. 하지만 지금은 너무 아프다. 이 아픔을 어떻게 견뎌야 할까?",
      date: "2024-05-15",
      emotion: {
        anger: 0.474,
        sadness: 0.756,
        anxiety: 0.460,
        hurt: 0.779,
        panic: 0.482,
        happiness: 0.054,
      },
    },
    {
      id: 11,
      title: "예기치 못한 순간",
      content:
        "오늘 정말 당황스러운 일을 겪었다. 평소와 다름없이 출근 준비를 하고 있었는데, 갑자기 집에 전기가 나가버렸다. 아침 준비를 다 못한 채로, 머리도 제대로 못 말리고 출근해야 했다. 겨우 출근했는데, 회사에 도착하자마자 중요한 발표 준비가 되어 있지 않다는 걸 알았다. 나는 발표 준비가 다 된 줄 알았는데, 파일이 제대로 저장되지 않은 것이었다. 순간 머리가 하얗게 변했다. 동료들의 시선이 느껴졌고, 너무 당황해서 손이 떨렸다. 급하게 대처하려고 애썼지만, 마음이 진정되지 않았다. 발표가 끝난 후에도 내내 심장이 두근거렸다. 이런 일이 생길 줄은 꿈에도 몰랐다. 아무리 철저히 준비해도 예기치 못한 일이 일어날 수 있다는 걸 다시 한 번 느꼈다. 앞으로는 어떻게 해야 할까? 너무나도 당황스러운 하루였다.",
      date: "2024-05-15",
      emotion: {
        anger: 0.321,
        sadness: 0.596,
        anxiety: 0.675,
        hurt: 0.375,
        panic: 0.795,
        happiness: 0.104,
      },
    },
    {
      id: 12,
      title: "작은 행복의 순간",
      content:
        "오늘은 정말 기쁜 일이 있었다. 오래 기다려왔던 프로젝트가 드디어 성공적으로 마무리되었다. 팀원들과 함께 열심히 노력한 결과가 빛을 발하는 순간이었다. 발표가 끝난 후 모두가 환호성을 질렀고, 나는 감격의 눈물을 흘렸다. 이렇게 기쁜 순간은 오랜만인 것 같다. 모두와 함께 축하 파티를 열고, 웃고 떠들며 시간을 보냈다. 그동안의 고생이 보상받는 듯한 느낌이었다. 집에 돌아오는 길에 저녁 노을을 보며, 이 작은 행복을 만끽했다. 오늘은 정말 행복한 날이다. 가끔씩 찾아오는 이런 기쁨의 순간들이 있기에 힘들어도 살아갈 수 있는 것 같다. 내일도 오늘처럼 행복할 수 있을까? 오늘의 이 기쁨을 마음속에 간직하고 싶다. 참으로 감사한 하루였다.",
      date: "2024-05-15",
      emotion: {
        anger: 0.331,
        sadness: 0.474,
        anxiety: 0.404,
        hurt: 0.283,
        panic: 0.239,
        happiness: 0.889,
      },
    },
  ];

  const id = parseInt(params.id, 10);
  const diary = dummyDiaries.find((diary) => diary.id === id) || null;

  return {
    props: {
      diary,
    },
  };
}

export async function getStaticPaths() {
  const ids = ["7", "8", "9", "10", "11", "12"];
  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default DiaryDetail;
