import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormFields } from "../types/schema";

const initialState: { value: FormFields[] } = { value: [] };

export const requestsSlice = createSlice({
  name: `requests`,
  initialState,
  reducers: {
    addRequest: (state, action: PayloadAction<FormFields>) => {
      state.value.push({
        ...action.payload,
      });
    },
  },
});

export default requestsSlice.reducer;
export const { addRequest } = requestsSlice.actions;
