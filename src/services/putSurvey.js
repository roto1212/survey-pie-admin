import axios from "axios";

function putSurvey(survey) {
  axios.put(`/surveys/${survey.id}`, survey)
    .then(response => {
      alert('저장되었습니다.');
      return response.data;
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
    });
}

export default putSurvey;