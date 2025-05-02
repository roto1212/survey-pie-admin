import { configureStore } from '@reduxjs/toolkit'
import surveyReducer from './survey/surveySlice'

export default configureStore({
  reducer: {
    survey: surveyReducer,
  }
})