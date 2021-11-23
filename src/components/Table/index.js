import React, { useContext, useState } from "react";
import { Table as AntTable } from "antd";
import Toolbar from "components/Toolbar";
import PopupContextMenu from "components/PopupContextMenu";
import s from "./styles.module.css";
import { TemplateTableContext } from "contexts/TemplateTable";

const Table = () => {
  const {
    data,
    gridData,
    toolbarActions,
    contextActions,
    dblClickAction,
    isLoading,
  } = useContext(TemplateTableContext);

  const [menu, setMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    recordKey: null,
  });

  const handleOpenContextMenu = (event, recordKey) => {
    event.preventDefault();
    if (!menu.visible) {
      document.addEventListener(`click`, function onClickOutside() {
        setMenu((prev) => ({
          ...prev,
          visible: false,
        }));
        document.removeEventListener(`click`, onClickOutside);
      });
    }
    setMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      recordKey,
    });
  };

  return (
    <div className={s.container}>
      {toolbarActions && <Toolbar actions={toolbarActions} />}
      <AntTable
        dataSource={data}
        columns={gridData?.columns}
        pagination={false}
        loading={isLoading}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: () => {
              dblClickAction(record.key);
            },
            onContextMenu: (event) => handleOpenContextMenu(event, record.key),
          };
        }}
        row
      />
      <PopupContextMenu
        key={`${menu.x}_${menu.y}`}
        actions={contextActions}
        {...menu}
      />
    </div>
  );
};

export default Table;
