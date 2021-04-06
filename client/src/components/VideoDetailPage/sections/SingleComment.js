import React, { useState } from "react";
import { Comment, message } from "antd";
import LikeDislike from "./LikeDislike";
import axios from "axios";

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  console.log(props.comment.writer.name);

  const onChangeHandle = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      writer: props.userId,
      videoId: props.videoId,
      responseTo: props.comment._id,
    };

    axios.post("/api/comment/saveComment", variable).then((res) => {
      if (res.data.try) {
        props.refresh(res.data.result);
        setCommentValue("");
        setOpenReply(false);
      } else {
        message.info("comment저장 실패 ");
      }
    });
  };

  const actions = [
    <LikeDislike
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span
      style={{ marginLeft: "20px", fontWeight: "bold" }}
      onClick={onClickReplyOpen}
      key="comment-basic=reply-to"
    >
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={props.comment.writer.name}
        content={<p>{props.comment.content}</p>}
      />

      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <textarea
            style={{
              width: "100%",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
            onChange={onChangeHandle}
            value={CommentValue}
            placeholder="코멘트 입력하세요 "
          />
          <br />
          <button
            style={{
              width: "20%",
              height: "1em",
            }}
          >
            submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
