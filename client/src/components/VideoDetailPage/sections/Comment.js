import React, { useReducer, useState } from "react";
import SingleComment from "./SingleComment";
import axios from "axios";
import { useSelector } from "react-redux";
import { message } from "antd";
import { COMMENT_SERVER } from "../../config";

function Comment(props) {
  const [CommentValue, setCommentValue] = useState("");

  const user = useSelector((state) => state.user);
  const videoId = props.videoId;

  const onChangeHandle = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 이벤트 활동 정지시키기
    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: videoId,
    };
    axios.post(`${COMMENT_SERVER}/saveComment`, variables).then((res) => {
      if (res.data.try) {
        props.refresh(res.data.result);
        setCommentValue("");
      } else {
        message.info("Comment 저장 실패했음");
      }
    });
  };

  return (
    <div>
      <h2>Replies</h2>
      <hr />

      {props.commentLists &&
        props.commentLists.map(          
          (comments, index) => (                        
              <SingleComment
                refresh={props.refresh}
                comment={comments}
                videoId={videoId}
              />
            )                   
            
        )}

      <form style={{ display: "flex" }}>
        <textarea
          style={{ width: "100%", borderRadius: "5px" }}
          placeholder="댓글기능입니다"
          onChange={onChangeHandle}
          value={CommentValue}
        />
        <br />
        <button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          글 올리기
        </button>
      </form>
    </div>
  );
}

export default Comment;
