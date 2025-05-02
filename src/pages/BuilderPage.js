import { Col, Input, Row } from "antd";

import OptionSection from "../components/OptionSection";
import PreviewSection from "../components/PreviewSection";
import MainLayout from "../layouts/MainLayout";
import {
	setTitle,
	addQuestion,
	moveUpQuestion,
	moveDownQuestion,
	deleteQuestion,
} from "../stores/survey/surveySlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function BuilderPage() {
	const survey = useSelector((state) => state.survey);

	const dispatch = useDispatch();
	return (
		<div>
			<MainLayout selectedKey="builder">
				<Row>
					<Col flex="auto">
						<Input
							placeholder="설문 제목을 입력해주세요."
							value={survey.title}
							onChange={(e) => {
								dispatch(setTitle(e.target.value));
							}}
						/>
						<PreviewSection
							questions={survey.questions}
							addQuestion={(type) => {
								dispatch(addQuestion(type));
							}}
							moveUpQuestion={(index) => {
								dispatch(moveUpQuestion(index));
							}}
							moveDownQuestion={(index) => {
								dispatch(moveDownQuestion(index));
							}}
							deleteQuestion={(index) => {
								dispatch(deleteQuestion(index));
							}}
						/>
					</Col>
					<Col flex="350px">
						<OptionSection />
					</Col>
				</Row>
			</MainLayout>
		</div>
	);
}

export default BuilderPage;
