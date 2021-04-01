import React from "react";

import { Formik } from "formik";

// import * as Yup from "yup";
import { Form, Input, message, Button } from "antd";

import { useDispatch } from "react-redux";
import { registerUser } from "../../_redux/user_actions";

function RegisterPage(props) {
  const dispatch = useDispatch();
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

          dispatch(registerUser(registerForm))
            .then((res) => {
              console.log(res);
              // dispatch 에 결과값은 액션함수의 객체다
              if (res.payload.try) {
                message.info("회원등록 성공");
                props.history.push("/login");
              } else {
                console.log(res.data.err);
                message.info("실패했습니다 빡대가리쉑");
              }
            })
            .then(setSubmitting(false));
        });
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

            <Form onSubmit={handleSubmit}>
              <Form.Item className="margin" required label="Name">
                <Input
                  id="name"
                  placeholder="이름 입력해"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item className="margin" required label="Email">
                <Input
                  id="email"
                  placeholder="이메일 입력해"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? "input-border" : ""
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item className="margin" required label="Password">
                <Input
                  id="password"
                  placeholder="비번 입력해"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur} //포커스를 잃었을때
                />
              </Form.Item>

              <Form.Item className="ok">
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                  style={{ minWidth: "100%" }}
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
