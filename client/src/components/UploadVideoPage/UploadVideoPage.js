import React, { useState } from "react";
import { Typography, Form, Icon, message } from "antd";
import Dropzone from "react-dropzone";
import axios from "axios";
import { VIDEO_SERVER } from "../config";
const { Title } = Typography;

function UploadVideoPage() {
  const ThumbnailPath = 1;

  const [VideoTitle, setTitleChange] = useState("");
  const [Description, setDescriptionChange] = useState("");
  const [Category, setCategoryChange] = useState("dog");
  const [FilePath, setFilePath] = useState("");

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
      Title: VideoTitle,
      Description: Description,
      Category: Category,
      FilePath: FilePath,
    };

    axios.post(`${VIDEO_SERVER}/uploadVideo`, FormList).then((res) => {
      if (res.data.try) {
        message.success("성공적으로 업로드했습니다");
      } else {
        message.info("비디오 업로드에 실패했습니다");
      }
    });
  };

  const onDrop = (file) => {
    //application/x-www-form-urlencoded 가 아닌 multipart/form-data의 형태로 전송해야 한다
    // 그러기 위해 formData로 바꾸어준다

    const formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    axios.post(`${VIDEO_SERVER}/uploadfiles`, formData, config).then((res) => {
      if (res.data.try) {
        let variable = {
          url: res.data.url,
          fileName: res.data.fileName,
        };

        setFilePath(res.data.url);

        // 썸네일도 만들기
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

        <button onClick={onSubmit}></button>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
