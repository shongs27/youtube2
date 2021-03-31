import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail" style={{ margin: "10px" }}>
        <a className="home" href="/">
          Home
        </a>
      </Menu.Item>
      <Menu.Item key="subscription" style={{ margin: "10px" }}>
        <a className="subscription" href="/subscription">
          Subscription
        </a>
      </Menu.Item>
      <SubMenu style={{ margin: "10px" }} title="Blog">
        <MenuItemGroup title="Item1">
          <Menu.Item key="1번">옵션1</Menu.Item>
          <Menu.Item key="2번">옵션2</Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup title="Item2">
          <Menu.Item key="3번">옵션3</Menu.Item>
          <Menu.Item key="4번">옵션4</Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
