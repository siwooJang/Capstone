import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// @material-ui/core components
import { Apps, CloudDownload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";
import { useDispatch } from 'react-redux';
import { logout } from '../../pages/slices/authSlice';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // 여기서 로그인 상태를 확인합니다. 예를 들어, sessionStorage에 토큰이 있는지 확인할 수 있습니다.
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리: 토큰 제거 등
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    dispatch(logout());
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <List className={classes.list}>
      {!isLoggedIn ? (
        <>
          <ListItem className={classes.listItem}>
            <Button
              href="/login"
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              <Icon className={classes.icons}>unarchive</Icon> 로그인
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              href="/register"
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              <Icon className={classes.icons}>unarchive</Icon> 회원가입
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              href="/landing"
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              <Icon className={classes.icons}>unarchive</Icon> 소개
            </Button>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <Button
              href="/mypage"
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              <Icon className={classes.icons}>unarchive</Icon> 일기 목록
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              href="/chatbot"
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              <CloudDownload className={classes.icons} /> 챗봇
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Button
              onClick={handleLogout}
              color="transparent"
              target="_self"
              className={classes.navLink}
            >
              <Icon className={classes.icons}>unarchive</Icon> 로그아웃
            </Button>
          </ListItem>
        </>
      )}
      <ListItem className={classes.listItem}>
        <Tooltip
          id="github-link"
          title="Github Link"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://github.com/ScobraCK/Capstone"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-github"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
