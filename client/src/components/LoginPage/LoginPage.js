import React from "react";
import Axios from "axios";
import { Formik, validateYupSchema } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox } from "antd";

const LoginPage = () => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("타당하지 않은 이메일 형식")
          .required("입력하라고 새끼야"),
        password: Yup.string()
          .min(3, "최소 3글자이상은 입력해 개새끼야")
          .required("입력하지 않으면 못지나간다"),
      })}
      onSubmit={async (values) => {
        await new Promise((res) => setTimeout(res, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      // validateYupSchema
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
          <Form name="Login" onSubmit={handleSubmit}>
            <Form.Item
              hasFeedback
              validateStatus={
                errors.email && touched.email ? "error" : "success"
              }
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
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
