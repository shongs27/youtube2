import React, { useEffect, useState } from "react";
import { List, Avatar, Row, Col } from "antd";
import Comment from "./sections/Comment";
import axios from "axios";
import { VIDEO_SERVER } from "../config";
function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState("");
  console.log(props.match.params);
  console.log(props.match.params.videoId);
  const videoId = props.match.params.videoId;

  useEffect(() => {
    axios.post(`${VIDEO_SERVER}/getVideoDetail`, videoId);
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:8080/${VideoDetail.filePath}`}
            />

            <List.Item actions={[<div>fuck</div>]}>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">고고싱</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
            <Comment />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default VideoDetailPage;
