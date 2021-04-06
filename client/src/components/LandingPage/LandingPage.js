import React, { useEffect, useState } from "react";

import { Row, Col, Typography, message, Card } from "antd";
import axios from "axios";
import { VIDEO_SERVER } from "../config";
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${VIDEO_SERVER}/getVideos`).then((res) => {
      if (res.data.try) {
        setVideos(res.data.videos);
        //상태를 바꿔줬으니 멈추고 리렌더링 처리 싹다 한 후에 나머지 실행해줌
        console.log("비교 첫번째", res.data.videos);
        console.log("비교 두번쨰", Videos);
      } else {
        message.info("비디오 가져오기에 실패했습니다");
      }
    });
  }, []);

  const RenderVideo = Videos.map((video, index) => {
    const minutes = Math.floor(video.Duration / 60);
    const seconds = Math.floor(video.Duration - minutes * 60);

    return (
      // grid 형태로 불러와지니깐 Row, Col을 썻지
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:8080/${video.ThumbnailPath}`}
            />
            <div className="duration">
              <span>
                {minutes}:{seconds}
              </span>
            </div>
          </a>
        </div>

        <br />
        <Meta title={video.Title} discription={video.Description} />
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "2rem auto" }}>
      <Title level={2}>Recommand</Title>
      <hr />
      <Row gutter={[32, 16]}>{RenderVideo}</Row>
    </div>
  );
}

export default LandingPage;
