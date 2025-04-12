import {Col, Row} from "antd";

import MainLayout from "../layouts/MainLayout";
function BuilderPage() {
	return (
		<div>
			<MainLayout selectedKey="builder">
				<h1>BuilderPage</h1>
        <Row>
          <Col flex="auto">Preview</Col>
          <Col flex="300px">Option</Col>
        </Row>
			</MainLayout>
		</div>
	);
}

export default BuilderPage;
