import { Button } from "antd";
import { useSelector } from "react-redux";
import putSurvey from "../../services/putSurvey";
import styled from "styled-components";
import postSurvey from "../../services/postSurvey";
import { useNavigate } from "react-router-dom";

function FloatingButton({ children }) {
  const survey = useSelector(state => state.survey.data);
  const isEditPage = !!survey.id; 
  const navigate = useNavigate();
  return <FloatingButtonWrapper>
    <Button type="primary" onClick={() =>isEditPage ? putSurvey(survey) : postSurvey(survey).then((data)=>{
      navigate(`/builder/${data.id}`);
    })}>
      {isEditPage ? '저장' : '생성'}
    </Button>
  </FloatingButtonWrapper>
}

const FloatingButtonWrapper = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;



export default FloatingButton;