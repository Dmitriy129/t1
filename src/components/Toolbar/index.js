import { Button, Col, Row } from "antd";
import React from "react";

const Toolbar = (props) => {
  const { actions } = props;
  return (
    <Row gutter={[16, 16]}>
      {actions.map((action) => (
        <Col key={action.id}>
          <Button onClick={action.runMethod} disabled={action.disabled}>
            {action.operationCaption}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default Toolbar;
