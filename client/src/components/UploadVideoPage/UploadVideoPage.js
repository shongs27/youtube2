import React, { useState } from "react";
import { Typography, Form, Icon, message } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { VIDEO_SERVER } from "../config";
import { useSelector } from "react-redux";
const { Title } = Typography;

function UploadVideoPage() {
  const user = useSelector((state) => state.user);
  

  const [VideoTitle, setTitleChange] = useState("");
  const [Description, setDescriptionChange] = useState("");
  const [Category, setCategoryChange] = useState("dog");
  const [FilePath, setFilePath] = useState("");
  //썸네일
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = (e) => {
    setTitleChange(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescriptionChange(e.target.vlaue);
  };

  const onCategoryChange = (e) => {
    setCategoryChange(e.target.value);
  };

  const CategoryList = [
    { value: 1, label: "dog" },
    { value: 2, label: "cat" },
    { value: 3, label: "cow" },
  ];

  const onSubmit = (e) => {
    e.preventDefault();

    const FormList = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Description,
      category: Category,
      FilePath: FilePath,
      Duration,
      ThumbnailPath,
    };

    axios.post(`${VIDEO_SERVER}/uploadVideo`, FormList).then((res) => {
      if (res.data.try) {
        message.success("성공적으로 업로드했습니다");
       
      } else {
        message.info("비디오 업로드에 실패했습니다");
      }
    });
  };

  const onDrop = (files) => {
    //용량이 큰 미디어 파일은 application/x-www-form-urlencoded 가 아닌 multipart/form-data의 형태로 전송해야 한다
    // <form enctype = "multipart/form-data">라고 하거나 axios를 이용하면 된다
    const formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("thatData", files[0]);

    axios.post(`${VIDEO_SERVER}/uploadfiles`, formData, config).then((res) => {
      if (res.data.try) {
        let variable = {
          url: res.data.url,
          fileName: res.data.fileName,
        };

        setFilePath(res.data.url);

        // 썸네일도 만들기

        axios.post(`${VIDEO_SERVER}/thumbnail`, variable).then((res) => {
          if (res.data.try) {
            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.url);
          } else {
            message.info("썸네일 생성에 실패했습니다");
          }
        });
      } else {
        message.info("비디오 업로드에 실패했습니다");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:8080/${ThumbnailPath}`}
                alt="Thumbnail"
              />
            </div>
          )}
        </div>

        <br />

        <label>Title</label>
        <input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />

        <label>Description</label>
        <textarea onChange={onDescriptionChange} value={Description}></textarea>

        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryList.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button onClick={onSubmit}>제출</button>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
