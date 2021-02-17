import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function QuestionCardDetail() {

    const [isLiked, setisLiked] = React.useState(true )

    const [isUnLiked, setisUnLiked] = React.useState(false)

    const [likesNo, setlikesNo] = React.useState(12 )

    const [disLikesNo, setdisLikesNo] = React.useState(8)
    //  questionDesc[Text]
    //Likes array
    //dislikes array
    //author name,id,
    // codeBlock ,Language

    

    

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
       
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
    
      <CardContent>
           {/* Add markdown field here */}
        
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>setisLiked((prev)=>{
            if(prev){
                setlikesNo(prevLikes=>prevLikes-1)
            }
            else{
                //Add user in liked array  of answer doc
                setlikesNo(prevLikes=>prevLikes+1)
            }
             return !prev
            })}>    
        {  isLiked? <ThumbUpAltIcon   color="primary"/>:<ThumbUpAltOutlinedIcon />}
        {/* ----------------------------------------------------------------- */}
        </IconButton>
        <Typography> {likesNo}

        </Typography>
        <IconButton aria-label="dislike button" onClick={()=>setisUnLiked((prev)=>{
            if(prev){
                //remove user form dislike array of answer doc
                setdisLikesNo(prevdisLikes=>prevdisLikes-1)
            }
            else{
                //Add user in dislike array  of answer doc
                setdisLikesNo(prevdisLikes=>prevdisLikes+1)
            }
             return !prev
            })}>    
        {  isUnLiked? <ThumbDownIcon   color="primary"/>:<ThumbDownAltOutlinedIcon />}
        </IconButton>
        <Typography> {disLikesNo}

        </Typography>
        

       
        
      </CardActions>
      
    </Card>
  );
}
