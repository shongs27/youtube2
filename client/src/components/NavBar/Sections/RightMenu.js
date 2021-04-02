import React, { useState } from "react";
import { Menu, message } from "antd";
import { useSelector } from "react-redux";
import { USER_SERVER } from "../../config";
import Axios from "axios";

import { withRouter } from "react-router-dom";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    Axios.get(`${USER_SERVER}/logout`).then((res) => {
      if (res.status === 200) {
        message.info("잘 가십시오");
        console.log(props);
        props.history.push("/login");
      } else {
        message.info("어딜갈라고?");
      }
    });
  };

  if (user.userData && user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item>
          <a href="/video">비디오</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item>
          <a href="/register">회원가입</a>
        </Menu.Item>
        <Menu.Item>
          <a href="/login">로그인</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
