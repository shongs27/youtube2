import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col, message } from "antd";
import Comment from "./sections/Comment";
import LikeDislike from "./sections/LikeDislike";

import axios from "axios";
import { VIDEO_SERVER, COMMENT_SERVER } from "../config";
function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState("");

  const videoId = props.match.params.videoId;
  const variable = { videoId };

  const [Comments, setComments] = useState([]);

  useEffect(() => {
    axios.post(`${VIDEO_SERVER}/getVideoDetail`, variable).then((res) => {
      if (res.data.try) {
        setVideoDetail(res.data.video);
      } else {
        message.info("비디오 정보를 가져오는데 실패했습니다");
      }
    });

    axios.post(`${COMMENT_SERVER}/getComment`, variable).then((res) => {
      setComments(res.data.comments);
    });
  }, []);

  const reFresh = () => {};

  if (VideoDetail.Writer) {
    //cookie 키 값 가져오기
    const getCookieValue = (key) => {
      let cookieKey = key + "=";
      let result = "";
      const cookieArr = document.cookie.split(";");

      for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i][0] === " ") {
          cookieArr[i] = cookieArr[i].substring(1);
        }

        if (cookieArr[i].indexOf(cookieKey) === 0) {
          result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
          return result;
        }
      }
      return result;
    };
    return (
      <>
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{ width: "100%", padding: "3rem 4rem" }}>
              <video
                style={{ width: "100%" }}
                src={`http://localhost:8080/${VideoDetail.FilePath}`}
                controls
              />

              <List.Item
                actions={[
                  <LikeDislike
                    video
                    userId={getCookieValue("Valid")}
                    videoId={videoId}
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={VideoDetail.Title}
                  description={VideoDetail.Description}
                />
              </List.Item>
              <Comment
                refresh={reFresh}
                commentLists={Comments}
                postId={videoId}
              />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <div>Loading ...</div>;
  }
}

export default VideoDetailPage;
