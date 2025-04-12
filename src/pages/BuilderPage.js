import {Col, Input, Row} from "antd";

import OptionSection from "../components/OptionSection";
import PreviewSection from "../components/PreviewSection";
import MainLayout from "../layouts/MainLayout";
function BuilderPage() {
  return (
    <MainLayout selectedKey="builder">
      <Row>
        <Col flex="auto">
          <Input style={{}} placeholder="설문제목을 입력해주세요." />
          <PreviewSection />
        </Col>
        <Col flex="300px">
          <OptionSection />
        </Col>
      </Row>
    </MainLayout>
  );
}

export default BuilderPage;
