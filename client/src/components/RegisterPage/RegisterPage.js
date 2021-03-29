import React from "react";
import Axios from "axios";
// import moment from "moment";

// 공부해야할것
import { Formik } from "formik";
// import * as Yup from "yup";
import { Form, Input, Bottom, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage() {
  return (
    <Formik
      initialValues={{ name: "", password: "", email: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let registerForm = {
            name: values.name,
            password: values.password,
            email: values.email,
          };
          Axios.post("/register", registerForm).then((res) => {
            if (res.data.try) {
              console.log("회원등록 성공");
            } else {
              alert("실패했습니다 빡대가리쉑");
            }
          });
          setSubmitting(false);
        }, 400);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>회원 가입</h2>
            <Form
              style={{ minWidth: "375px" }}
              {...formItemLayout}
              onSubmit={handleSubmit}
            >
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="이름 입력해"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item required label="Email">
                <Input
                  id="email"
                  placeholder="이메일 입력해"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item required label="Password">
                <Input
                  id="password"
                  placeholder="비번 입력해"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  제출
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
