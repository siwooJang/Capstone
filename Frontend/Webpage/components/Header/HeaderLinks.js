/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

// core components
import CustomDropdown from "/components/CustomDropdown/CustomDropdown.js";
import Button from "/components/CustomButtons/Button.js";

import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>


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
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
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
