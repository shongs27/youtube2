import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Icon } from "antd";

import { useDispatch } from "react-redux";
import { loginUser } from "../../_redux/user_actions";

const LoginPage = (props) => {
  const dispatch = useDispatch();

  const [rememberMe, SetrememberMe] = useState(false);

  const handleRememberme = () => {
    SetrememberMe(!rememberMe);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("이메일 형식 오류")
          .required("이메일 입력 필요"),
        password: Yup.string()
          .min(3, "최소 3글자이상은 입력하셈")
          .required("비밀번호 입력 필요"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        let LoginForm = {
          email: values.email,
          password: values.password,
        };

        //////// 1번 promise 객체
        dispatch(loginUser(LoginForm))
          .then((res) => {
            if (res.payload.try) {
              // res.cookie("Valid", res.payload.userId);
              // localstorage는 백엔드가 아니라 프론트엔드부분이다
              localStorage.setItem("userId", res.payload.userId);
              message.info("성공했어.. 보여줄꼐 로그인정보");
              props.history.push("/");
            } else {
              message.info("실패했어.. 왤까?");
            }
          })
          .then(setSubmitting(false));

        /////////// 2번 async await
        // foo();
        // async function foo() {
        //   const res = await Axios.post(`${USER_SERVER}/login`, LoginForm);
        //   if (res.data.try) {
        //     message.info("로그인 성공");
        //     // props.history.push("/landing");
        //   } else {
        //     console.log(res.data.err);
        //     message.info("로그인 실패했습니다");
        //   }
        //   setSubmitting(false);
        // }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="app">
          <h2>로그인</h2>
          <Form name="Login">
            <Form.Item
              required // * 별표시
              hasFeedback // 테두리
              validateStatus={
                errors.email && touched.email ? "error" : "success"
              } // 불들어오는거
              className="margin"
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "이메일을 입력하셔야죠",
                },
              ]}
            >
              <Input
                prefix={<Icon type="user" />}
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-border" : ""}
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
            </Form.Item>

            <Form.Item
              className="margin"
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "이메일 입력하라니깐요?",
                },
              ]}
            >
              <Input.Password
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={
                  errors.password && touched.password ? "input-border" : ""
                }
              />
              {errors.password && touched.password && (
                <div className="input-feedback">{errors.password}</div>
              )}
            </Form.Item>
            <br />
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox onChange={handleRememberme} checked={rememberMe}>
                Remember me
              </Checkbox>
              &nbsp; &nbsp; &nbsp;
              <a href="/register" target="_self" style={{ font: "blue" }}>
                회원가입
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                type="primary"
                style={{ minWidth: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
