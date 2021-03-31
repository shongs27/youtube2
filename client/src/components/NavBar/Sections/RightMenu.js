import React from "react";
import { Menu } from "antd";

function RightMenu(props) {
  const logoutHandler = () => {};

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

  // if(/* 노인증 */) {
  // return (
  //   <Menu mode={props.mode}>
  //     <Menu.Item>
  //       <a href="/register">회원가입</a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a href="/login">로그인</a>
  //     </Menu.Item>
  //   </Menu>
  // );
  // }else {
  //   return (
  //     <Menu mode={props.mode}>
  //     <Menu.Item>
  //       <a href="/video">비디오</a>
  //     </Menu.Item>
  //     <Menu.Item>
  //       <a onClick={logoutHandler}>로그아웃</a>
  //     </Menu.Item>
  //   </Menu>
  //   )
  // }
}

export default RightMenu;
