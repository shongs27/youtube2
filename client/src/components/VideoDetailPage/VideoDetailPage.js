import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col, message } from "antd";
import Comment from "./sections/Comment";
import LikeDislike from "./sections/LikeDislike";

import axios from "axios";
import { VIDEO_SERVER, COMMENT_SERVER } from "../config";
function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
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
      if (res.data.try) {
        
        setComments(res.data.comments);
      } else {
        message.info("코멘트 정보를 가져오는데 실패했음");
      }
    });
  }, []);

  const refreshFunction = (newData) => {
    // console.log("newData", newData)
    setComments([...Comments, ...newData]);
    // setComments(Comments.concat(newData));
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
                  userId={localStorage.getItem("userId")}
                  videoId={videoId}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                // title={VideoDetail.writer.name}
                // description={VideoDetail.description}
              />
            </List.Item>
            <Comment
              refresh={refreshFunction}
              commentLists={Comments}
              videoId={videoId}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default VideoDetailPage;
