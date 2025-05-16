import { useDispatch, useSelector } from "react-redux";
import AddButton from "../AddButton";
import Body from "../Body";
import Card from "../Card";
import {
	addQuestion,
	deleteQuestion,
	moveDownQuestion,
	moveUpQuestion,
} from "../../stores/survey/surveySlice";
import { setSelectedQuestionId } from "../../stores/selectedQuestionId/selectedQuestionIdSlice";

function PreviewSection() {
	// const { questions = [] } = useSelector((state) => state.survey?.data || {});
	const questions = useSelector((state) => state.survey.data?.questions || []);
	const selectedQuestionId = useSelector(
		(state) => state.selectedQuestionId.data
	);
	const dispatch = useDispatch();
	const handleAddQuestion = (type) => {
		dispatch(addQuestion(type));
	};
	const handleMoveUpQuestion = (index) => {
		dispatch(moveUpQuestion(index));
	};
	const handleMoveDownQuestion = (index) => {
		dispatch(moveDownQuestion(index));
	};
	const handleDeleteQuestion = (index) => {
		dispatch(deleteQuestion(index));
	};

  const handleCardClick = (index) => {
    dispatch(setSelectedQuestionId(index))
  }
	return (
		<div>
			{questions.map((question, index) => (
				<Card
					key={index}
					title={question.title}
					desc={question.desc}
					onMoveUp={() => handleMoveUpQuestion(index)}
					onMoveDown={() => handleMoveDownQuestion(index)}
					onDelete={() => handleDeleteQuestion(index)}
					onClick={() => handleCardClick(index)}
					$isSelected={selectedQuestionId === index}
				>
					<Body type={question.type} options={question.options} />
				</Card>
			))}
			<AddButton addQuestion={handleAddQuestion} />
		</div>
	);
}

export default PreviewSection;
