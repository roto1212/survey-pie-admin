import fetcher from "../lib/fetcher";
import { setError, setLoading, setSurvey } from "../stores/survey/surveySlice";

const fetchSurvey = (surveyId) => (dispatch, getState) => {
	setLoading(true);
	fetcher(`/surveys/${surveyId}`)
		.then((data) => {
			dispatch(setSurvey(data));
		})
		.catch((error) => {
			console.error("Error fetching survey:", error);
			dispatch(setError(error));
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

export default fetchSurvey;
