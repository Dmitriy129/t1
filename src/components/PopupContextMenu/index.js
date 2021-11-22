import { Dropdown, Menu } from "antd";
import React from "react";
import s from "./styles.module.css";

const menu = (actions) => {
  if (!actions || actions.length <= 0) return <Menu> No actions</Menu>;
  return (
    <Menu>
      {actions.map((action) => (
        <Menu.Item key={action.ord} onClick={action.runMethod}>
          {action.caption}
        </Menu.Item>
      ))}
    </Menu>
  );
};

function PopupContextMenu(props) {
  const { visible, x, y, actions, recordKey } = props;
  const mapedActions = actions.map((e) => ({
    ...e,
    runMethod: () => e.runMethod(recordKey),
  }));
  return (
    <Dropdown
      overlay={menu(mapedActions)}
      visible={visible}
      arrow
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <div className={s.target} style={{ left: `${x}px`, top: `${y}px` }} />
    </Dropdown>
  );
}

export default PopupContextMenu;
