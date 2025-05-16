import { Col, Input, Row } from "antd";

import OptionSection from "../components/OptionSection";
import PreviewSection from "../components/PreviewSection";
import MainLayout from "../layouts/MainLayout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchSurvey from "../services/fetchSurvey";
import BuilderTitleInput from "../components/BuilderTitleInput";

function BuilderPage() {
	const loading = useSelector((state) => state.survey.loading);
	const error = useSelector((state) => state.survey.error);
	const dispatch = useDispatch();
	const { surveyId } = useParams();

	useEffect(() => {
		dispatch(fetchSurvey(surveyId));
	}, [dispatch, surveyId]);

	if (error) {
		return <div>에러가 발생했습니다.</div>;
	}

	if (loading) {
		return <div>로딩중...</div>;
	}
	return (
		<div>
			<MainLayout selectedKey="builder">
				<Row>
					<Col flex="auto">
						<BuilderTitleInput />
						<PreviewSection />
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
