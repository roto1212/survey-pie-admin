import { Col, Row } from "antd";

import OptionSection from "../components/OptionSection";
import PreviewSection from "../components/PreviewSection";
import MainLayout from "../layouts/MainLayout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchSurvey from "../services/fetchSurvey";
import BuilderTitleInput from "../components/BuilderTitleInput";
import FloatingButton from "../components/FloatingButton";
import { resetSurvey } from "../stores/survey/surveySlice";
import { setSelectedQuestionId } from "../stores/selectedQuestionId/selectedQuestionIdSlice";

function BuilderPage() {
	const loading = useSelector((state) => state.survey.loading);
	const error = useSelector((state) => state.survey.error);
	const dispatch = useDispatch();
	const { surveyId } = useParams();

	useEffect(() => {
		if (surveyId) {
			dispatch(fetchSurvey(surveyId));
		} else {
			dispatch(resetSurvey());
			dispatch(setSelectedQuestionId(null));
		}
	}, [dispatch, surveyId]);

	if (error) {
		return <div>에러가 발생했습니다.</div>;
	}

	if (loading) {
		return <div>로딩중...</div>;
	}
	return (
		<div>
			<MainLayout selectedKey="builder" padding={0}>
				<Row style={{ height: "100%" }}>
					<Col flex="auto" style={{ padding: 30 }}>
						<BuilderTitleInput />
						<PreviewSection />
					</Col>
					<Col flex="350px">
						<OptionSection />
					</Col>
				</Row>
				<FloatingButton/>
			</MainLayout>
		</div>
	);
}

export default BuilderPage;
