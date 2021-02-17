import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import "./App.css";
import Card from "./components/QuestionCard";
import { auth, firestore } from "./firebase_config";
import QuestionDetail from "./components/QuestionDetail";
import Editor from "./components/Editor";
import LoadingComp from "./components/LoadingComp";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function App() {
  let [fs_data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [nextBtn, setnextBtn] = useState(true);
  const classes = useStyles();

  const query = firestore
    .collection("questions_collection")
    .orderBy("date", "desc");

  useEffect(() => {
    query.limit(2).onSnapshot((snapshot) => {
      let updated_list = [];
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      snapshot.docs.map((doc) => {
        let a = doc.data();
        a["id"] = doc.id;
        updated_list.push(a);
      });
      setdata(updated_list);
      setloading(false);
    });
  }, []);
  const last = fs_data[fs_data.length - 1];

  const handlePagination = () => {
    query
      .limit(2)
      .startAfter(lastDoc)
      .get()
      .then((snaps) => {
        console.log(snaps.docs.length);
        if (snaps.docs.length === 0) {
          setnextBtn(false);
          return false;
        }

        snaps.forEach((item) => {
          setLastDoc(item);
          let temp = item.data();
          temp["id"] = item.id;

          setdata((prev) => [...prev, temp]);
        });
      });
  };

  return (
    <>
      {loading ? (
        <LoadingComp></LoadingComp>
      ) : (
        fs_data.map((qn, index) => <Card key={qn.id} question={qn} />)
      )}
      <div className={classes.root}>
        {loading != true && nextBtn ? (
          <Button onClick={handlePagination} variant="outlined">
            <ExpandMoreIcon />{" "}
          </Button>
        ) : (
          <p></p>
        )}
        {!nextBtn && <p>No more questions to see</p>}
      </div>
    </>
  );
}

export default App;
