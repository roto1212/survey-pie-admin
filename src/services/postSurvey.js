import axios from "axios";

function postSurvey(survey) {
  return axios.post(`/surveys`, {...survey, createdAt: Date.now()})
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