import axios from 'axios';

/**
 * 설문조사를 삭제하는 함수
 * @created 24-01-15 선대범
 * @param {number} surveyId - 삭제할 설문조사의 ID
 * @example
 * deleteSurvey(1);
 */
function deleteSurvey(surveyId) {
  return axios.delete(`/surveys/${surveyId}`)
    .then(response => {
      alert('삭제되었습니다.');
      return response.data;
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
    });
}

export default deleteSurvey;