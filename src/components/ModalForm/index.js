import { Col, Modal, Row } from "antd";
import React from "react";
import s from "./styles.module.css";

const ModalForm = (props) => {
  const { visible, close, data } = props;

  return (
    <Modal visible={visible} title="Record data" onCancel={close} footer={null}>
      <Row gutter={[16, 0]}>
        {(data &&
          data.map(([key, value]) => (
            <Col key={key} span={12} className={s.field}>
              <Row gutter={[16, 0]}>
                <Col key={`${key}_${key}`} span={12} className={s.fieldName}>
                  {key}:
                </Col>
                <Col key={`${key}_${value}`} span={12} className={s.fieldValue}>
                  {value}
                </Col>
              </Row>
            </Col>
          ))) ||
          "empty object"}
      </Row>
    </Modal>
  );
};

export default ModalForm;
