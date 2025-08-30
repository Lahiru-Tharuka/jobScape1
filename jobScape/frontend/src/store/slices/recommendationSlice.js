import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    recommendations: [],
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
    },
    recommendSuccess(state, action) {
      state.loading = false;
      state.recommendations = action.payload;
    },
    skillsSuccess(state, action) {
      state.loading = false;
      state.skills = action.payload;
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const fetchRecommendations = (resume) => async (dispatch) => {
  try {
    dispatch(recommendationSlice.actions.request());
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/recommend`,
      { resume },
      { withCredentials: true }
    );
    dispatch(recommendationSlice.actions.recommendSuccess(data.recommendations));
  } catch (error) {
    dispatch(
      recommendationSlice.actions.failure(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const fetchSkillSuggestions = (resume, category) => async (dispatch) => {
  try {
    dispatch(recommendationSlice.actions.request());
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/suggestSkills`,
      { resume, category },
      { withCredentials: true }
    );
    dispatch(recommendationSlice.actions.skillsSuccess(data.missingSkills));
  } catch (error) {
    dispatch(
      recommendationSlice.actions.failure(
        error.response?.data?.message || error.message
      )
    );
  }
};

export const clearRecommendationErrors = () => (dispatch) => {
  dispatch(recommendationSlice.actions.clearErrors());
};

export default recommendationSlice.reducer;
