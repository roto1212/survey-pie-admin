import { configureStore } from "@reduxjs/toolkit";
import surveyReducer from "./survey/surveySlice";
import thunk from "./middleware/thunk";

export default configureStore({
	reducer: {
		survey: surveyReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
