import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	data: {
		title: "",
		questions: [],
	},
	loading: false,
	error: null,
};
export const surveySlice = createSlice({
	name: "survey",
	initialState,
	reducers: {
		setTitle: (state, action) => {
			state.data.title = action.payload;
		},
		addQuestion: (state, action) => {
			const type = action.payload;
			const options = {};
			if (type !== "select" && type !== "text" && type !== "textarea") return;
			if (type === "select") {
				options.items = ["식품", "전자기기", "도서", "의류", "돈"];
				options.max = 1;
			} else if (type === "text" || type === "textarea") {
				options.max = 20;
				options.placeholder = "20자 이내로 입력해주세요.";
			}
			const emptyQuestion = {
				title: "Untitled",
				desc: "",
				type,
				required: false,
				options,
			};
			state.data.questions.push(emptyQuestion);
		},
		moveUpQuestion: (state, action) => {
			const index = action.payload;
			if (index === 0) return;

			const question = state.data.questions[index];
			state.data.questions[index] = state.data.questions[index - 1];
			state.data.questions[index - 1] = question;
		},
		moveDownQuestion: (state, action) => {
			const index = action.payload;
			if (index === state.data.questions.length - 1) return;

			const question = state.data.questions[index];
			state.data.questions[index] = state.data.questions[index + 1];
			state.data.questions[index + 1] = question;
		},
		deleteQuestion: (state, action) => {
			const index = action.payload;
			if (index < 0 || index >= state.data.questions.length) return;
			state.data.questions.splice(index, 1);
		},
		setSurvey: (state, action) => {
			state.data = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
    setQuestion: (state, action) => {
      const index = action.payload.index;
      const question = action.payload.question;
      if (index < 0 || index >= state.data.questions.length) return;
      state.data.questions[index] = question;
    },
		resetSurvey: (state) => {
			state.data = {
				title: "",
				questions: [],
			};
		}
	},
});

// Action creators are generated for each case reducer function
export const {
	setTitle,
	addQuestion,
	moveUpQuestion,
	moveDownQuestion,
	deleteQuestion,
	setSurvey,
	setLoading,
	setError,
  setQuestion,
	resetSurvey,
} = surveySlice.actions;

export default surveySlice.reducer;
