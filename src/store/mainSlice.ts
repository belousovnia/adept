import { CompaniesType } from "./../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  companies: CompaniesType;
  selectedСompanies: CompaniesType;
}

const initialState: CounterState = {
  value: 0,
  companies: {},
  selectedСompanies: {},
};

export const mainSlice = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    selectСompany: (state, action: PayloadAction<string>) => {
      if (state.companies && state.companies[action.payload]) {
        state.selectedСompanies[action.payload] =
          state.companies[action.payload];
      }
    },
    selectAllСompany: (state) => {
      if (state.companies) state.selectedСompanies = state.companies;
    },
    canselСompany: (state, action: PayloadAction<string>) => {
      if (action.payload in state.selectedСompanies)
        delete state.selectedСompanies[action.payload];
    },
    canselAllСompany: (state) => {
      state.selectedСompanies = {};
    },
    changeNameСompany: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      if (action.payload.id in state.companies) {
        state.companies[action.payload.id].name = action.payload.newName;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    changeAddressСompany: (
      state,
      action: PayloadAction<{ id: string; newAddress: string }>
    ) => {
      if (action.payload.id in state.companies) {
        state.companies[action.payload.id].address = action.payload.newAddress;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    setCompanies: (state, action: PayloadAction<CompaniesType>) => {
      state.companies = action.payload;
    },
    deleteCompanies: (state) => {
      if (state.selectedСompanies) {
        for (const key in state.companies) {
          if (Object.prototype.hasOwnProperty.call(state.companies, key)) {
            if (key in state.selectedСompanies) delete state.companies[key];
          }
        }

        state.selectedСompanies = {};
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    createNewСompany: (state) => {
      const key = Math.floor(Math.random() * 1000000);
      console.log(key);

      state.companies[key] = { name: "", employees: {}, address: "" };
    },
  },
});

export const {
  canselСompany,
  selectСompany,
  deleteCompanies,
  setCompanies,
  selectAllСompany,
  canselAllСompany,
  changeNameСompany,
  changeAddressСompany,
  createNewСompany,
} = mainSlice.actions;

export default mainSlice.reducer;
