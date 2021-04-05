import React, { useState, useEffect } from "react";
import { Icon, message, Tooltip } from "antd";
import axios from "axios";

function LikeDislike(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);

  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  //LikeDislike가 어디서 오는가?
  let variable = {};
  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commnetId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((res) => {
      if (res.data.try) {
        setLikes(res.data.likes.length);
        console.log(res.data.likes);
        res.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        message.info("likes의 정보를 가져오지 못했습니다");
      }
    });

    axios.post("/api/like/getDislikes", variable).then((res) => {
      if (res.data.try) {
        //얼마나 많은 좋아요를 받았는지
        setDislikes(res.data.dislikes.length);

        //내가 이미 그 좋아요를 눌렀는지
        res.data.dislikes.map((dislike) => {
          //누른 사람중에 내 아이디가 있는지 확인
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("DisLikes에 정보를 가져오지 못했습니다");
      }
    });
  });

  const onLike = () => {
    // 1. 아직 클릭이 안되어있을때
    if (LikeAction === null) {
      axios.post("/api/like/uplike", variable).then((res) => {
        if (res.data.try) {
          setLikes(Likes + 1);
          setLikeAction("liked");

          //dislike는 클릭이 되어 있다면
          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert("Like를 올리지 못했습니다");
        }
      });
    } else {
      //2. 이미 클릭이 되어있을때
      axios.post("/api/like/unlike", variable).then((res) => {
        if (res.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert("Like를 내리지 못했습니다");
        }
      });
    }
  };

  const onDislike = () => {
    if (DislikeAction !== null) {
      axios.post("/api/like/unDislike", variable).then((res) => {
        if (res.data.try) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert("dislike를 지우지 못했습니다");
        }
      });
    } else {
      axios.post("/api/like/upDislike", variable).then((res) => {
        if (res.data.try) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");
          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          message.info("dislike를 지우지 못했습니다");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="like">
          <Icon
            type="like"
            style={{ fontSize: "16px" }}
            theme="outlined"
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLEft: "8px", cursor: "auto" }}>{Likes}</span>
      </span>

      <br />
      <span key="comment-basic-dislike">
        <Tooltip title="like">
          <Icon
            type="dislike"
            style={{ fontSize: "16px" }}
            theme="outlined"
            onClick={onDislike}
          />
        </Tooltip>
        <span style={{ paddingLEft: "8px", cursor: "auto" }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
