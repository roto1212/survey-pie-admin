import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "./survey/surveySlice";
import thunk from "./middleware/thunk";
import selectedQuestionIdReducer from "./selectedQuestionId/selectedQuestionIdSlice";

export default configureStore({
	reducer: {
		survey: surveyReducer,
		selectedQuestionId: selectedQuestionIdReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
