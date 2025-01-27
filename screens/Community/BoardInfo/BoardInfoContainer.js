import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";
import Api from "../../../api";
import Send from "../../../assets/icon/Send";
import { CreateBoardInfo, CreateComment } from "./BoardInfoPresenter";

export default ({ route }) => {
  const [boardInfo, setBoardInfo] = useState();
  const [commentInfo, setCommentInfo] = useState([]);
  const [myComment, setMyComment] = useState();
  const [level, setLevel] = useState(0);
  const [precedingComment, setPrecedingComment] = useState();
  const [previewFile, setPreviewFile] = useState();
  const [allFile, setAllFile] = useState();

  const getData = async () => {
    const response = await Api.getFreeBoardInfo(route.params.boardId);
    if (response.status == 200) {
      setBoardInfo(response.data[0]);
    }
    const saleBoard = await Api.getSaleBoardInfo(route.params.boardId);
    if (saleBoard.status == 200) {
      if (saleBoard.data[0]?.previewFile)
        setPreviewFile(saleBoard.data[0].previewFile);
      if (saleBoard.data[0]?.allFile) setAllFile(saleBoard.data[0].allFile);
    }
  };

  const getComment = async () => {
    const comment = await Api.getBoardComment(route.params.boardId);
    if (comment.status == 200) {
      setCommentInfo(comment.data);
    }
  };

  const postData = async () => {
    const response = await Api.postComment(
      route.params.boardId,
      myComment,
      level,
      precedingComment
    );
    if (response.success == true) {
      getComment();
    } else {
      Alert.alert(response.message);
    }
  };

  const payment = () => {
    console.log("payment");
  };

  useEffect(() => {
    getData();
    getComment();
  }, []);

  return boardInfo ? (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          height: "93%",
          width: "100%",
        }}
      >
        <ScrollView>
          <CreateBoardInfo
            boardInfo={boardInfo}
            previewFile={previewFile}
            allFile={allFile}
            payment={payment}
          />
          <CreateComment commentInfo={commentInfo} />
        </ScrollView>
      </View>
      <View
        style={{
          height: "7%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "#E3E0E0",
          borderTopColor: "#CACACA",
          borderTopWidth: 0.2,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            width: "80%",
            minWidth: 300,
            backgroundColor: "white",
            height: 35,
            borderRadius: 10,
            fontFamily: "nanumBold",
          }}
          onChangeText={(text) => setMyComment(text)}
          value={myComment}
          onSubmitEditing={() => {
            setMyComment("");
            postData();
          }}
        ></TextInput>
        <Send style={{ position: "absolute", left: "83%", zIndex: 5 }} />
      </View>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContents: "center",
        aligenItem: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="small" color="purple" />
    </View>
  );
};
