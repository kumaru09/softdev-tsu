import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { authHeader } from "../helpers/auth-header";

export const initialState = {
  loading: false,
  hasErrors: false,
  transcript: [],
  hasTranscript: false,
};

const transcriptSlice = createSlice({
  name: "transcript",
  initialState,
  reducers: {
    getTranscript: (state) => {
      state.loading = true;
      state.hasTranscript = false
    },
    getTranscriptSuccess: (state, { payload }) => {
      state.transcript = payload;
      state.loading = false;
      state.hasErrors = false;
      state.hasTranscript = true
    },
    getTranscriptFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const {
  getTranscript,
  getTranscriptSuccess,
  getTranscriptFailure,
} = transcriptSlice.actions;
export const transcriptSelector = (state) => state.transcript;
export default transcriptSlice.reducer;

export function fetchTranscript(id) {
  return async (dispatch) => {
    dispatch(getTranscript());

    Axios.get(`https://api.19991999.xyz/transcripts/${id}`, {
      headers: authHeader(),
    })
      .then((res) => {
          console.log(res)
        dispatch(getTranscriptSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(getTranscriptFailure());
      });
  };
}

export function fetchAllTranscript() {
  return async (dispatch) => {
    dispatch(getTranscript());

    Axios.get("https://api.19991999.xyz/transcripts/", {
      headers: authHeader(),
    })
      .then((res) => {
          console.log(res.data)
          if (res.data === null) dispatch(getTranscriptSuccess([]))
          else dispatch(getTranscriptSuccess(res.data))
      })
      .catch((err) => {
        console.log(err);
        dispatch(getTranscriptFailure());
      });
  };
}

export function fetchTourTranscript(id) {
    return async (dispatch) => {
      dispatch(getTranscript());
  
      Axios.get(`https://api.19991999.xyz/tours/${id}/transcripts`, {
        headers: authHeader(),
      })
        .then((res) => {
          dispatch(getTranscriptSuccess(res.data));
        })
        .catch((err) => {
          console.log(err);
          dispatch(getTranscriptFailure());
        });
    };
  }