import axios from "axios";

function postSurvey(survey) {
  axios.post(`/surveys`, survey)
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

export default postSurvey;