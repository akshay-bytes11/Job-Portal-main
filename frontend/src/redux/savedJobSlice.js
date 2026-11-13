import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
    name: "savedJob",
    initialState: {
        savedJobIds: [],
        savedJobs: [],
    },
    reducers: {
        setSavedJobIds: (state, action) => {
            state.savedJobIds = action.payload;
        },
        toggleSavedJobId: (state, action) => {
            const jobId = action.payload;
            if (state.savedJobIds.includes(jobId)) {
                state.savedJobIds = state.savedJobIds.filter(id => id !== jobId);
            } else {
                state.savedJobIds.push(jobId);
            }
        },
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload;
        }
    }
});

export const { setSavedJobIds, toggleSavedJobId, setSavedJobs } = savedJobSlice.actions;
export default savedJobSlice.reducer;
