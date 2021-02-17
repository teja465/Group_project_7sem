import React, { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import CreateIcon from "@material-ui/icons/Create";
import Link from "@material-ui/core/Link";
import config from "../config";
import Popover from "@material-ui/core/Popover";
import { formatDistance, subDays } from "date-fns";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: "auto",
      marginBottom: "10px",
      //padding: "5px",
    },
    text: {
      fontWeight: "500",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      // color: "primary",
    },

    avatar: {
      backgroundColor: red[500],

      // color: "white",
    },
    mlauto: {
      marginLeft: "auto",
    },
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export default function RecipeReviewCard({ question }) {
  let quest = question.question;
  let user_name = question.userName;
  let date = question.date;
  let date_on_profile = formatDistance(subDays(new Date(date), 0), new Date());

  //console.log(date,quest,user_name,question)
  let question_id = "2132";
  let url = config.url + "/add_answer/" + question_id;
  let answers_url = config.url + "/answers/" + question_id;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setvalue] = useState(config.url+'/'+question.id)
  const [isCopied, setisCopied] = useState(false)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [] = useState("teja46 user ");

  const [] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <CopyToClipboard text={value}
          onCopy={() =>setisCopied(true)}>
            <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CopyToClipboard>
 
       
        }
        title={user_name}
        subheader={date_on_profile}
      />

      <CardContent>
        <Typography
          variant="body1"
          
          component="p"
          className={classes.text}
        >
          {/*   {quest}       */}
          {quest.length < 120 ? quest : quest.substring(0, 100)}
          {quest.length < 120 ? "" : <Link href="more ">...more</Link>}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div>
          <Link
            href={url}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            onTouchMove={handlePopoverOpen}
          >
            <IconButton aria-label="add to favorites">
              <CreateIcon />
            </IconButton>
          </Link>

          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>Answer this question </Typography>
          </Popover>
        </div>

        <Link href={answers_url} className={classes.mlauto}>
          <Typography>Answers</Typography>
        </Link>
      </CardActions>
    </Card>
  );
}
