import { companiesData } from "../data";
import { CompaniesType } from "./../types/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
  companies: CompaniesType[];
  selectedСompanies: CompaniesType[];
}

const data = localStorage.getItem("companies");

const initialState: CounterState = {
  value: 0,
  companies: data ? JSON.parse(data) : [],
  selectedСompanies: [],
};

export const mainSlice = createSlice({
  name: "mainStore",
  initialState,
  reducers: {
    selectСompany: (state, action: PayloadAction<string>) => {
      const newSelect = state.companies.find((i) => i.id === action.payload);
      newSelect &&
        state.selectedСompanies.push({ ...newSelect, employees: [] });
    },
    selectAllСompany: (state) => {
      if (state.companies)
        state.selectedСompanies = state.companies.map((item) => {
          return { ...item, employees: [] };
        });
    },
    canselСompany: (state, action: PayloadAction<string>) => {
      const newSelectedСompanies = state.selectedСompanies.filter(
        (i) => i.id !== action.payload
      );
      state.selectedСompanies = newSelectedСompanies;
    },
    canselAllСompany: (state) => {
      state.selectedСompanies = [];
    },
    changeNameСompany: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      const index = state.companies.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index >= 0) {
        state.companies[index].name = action.payload.newName;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    changeAddressСompany: (
      state,
      action: PayloadAction<{ id: string; newAddress: string }>
    ) => {
      const index = state.companies.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index >= 0) {
        state.companies[index].address = action.payload.newAddress;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    setCompanies: (state, action: PayloadAction<CompaniesType[]>) => {
      state.companies = action.payload;
    },
    rebootCompanies: (state) => {
      state.companies = companiesData;
      localStorage.setItem("companies", JSON.stringify(companiesData));
    },
    deleteCompanies: (state) => {
      if (state.selectedСompanies && state.companies) {
        state.companies = state.companies.filter(
          (item) =>
            !state.selectedСompanies.find(
              (itemSelect) => itemSelect.id === item.id
            )
        );

        state.selectedСompanies = [];
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    createNewСompany: (state) => {
      const key = Math.floor(Math.random() * 1000000);

      state.companies.push({
        id: String(key),
        name: "",
        employees: [],
        address: "",
      });

      localStorage.setItem("companies", JSON.stringify(state.companies));
    },
    selectEmployee: (
      state,
      action: PayloadAction<{ companyId: string; employeeId: string }>
    ) => {
      const indexCompany = state.companies.findIndex(
        (i) => i.id === action.payload.companyId
      );
      const indexCompanySelect = state.selectedСompanies.findIndex(
        (i) => i.id === action.payload.companyId
      );
      const indexNewEmployee = state.companies[
        indexCompany
      ].employees.findIndex((i) => i.id === action.payload.employeeId);

      state.selectedСompanies[indexCompanySelect].employees.push(
        state.companies[indexCompany].employees[indexNewEmployee]
      );
    },
    canselEmployee: (
      state,
      action: PayloadAction<{ companyId: string; employeeId: string }>
    ) => {
      const indexCompanySelect = state.selectedСompanies.findIndex(
        (i) => i.id === action.payload.companyId
      );
      state.selectedСompanies[indexCompanySelect].employees =
        state.selectedСompanies[indexCompanySelect].employees.filter(
          (i) => i.id !== action.payload.employeeId
        );
    },
    selectAllEmployee: (state) => {
      state.selectedСompanies.forEach((item, index) => {
        const company = state.companies.find((i) => i.id === item.id);
        if (company)
          state.selectedСompanies[index].employees = company.employees;
      });
    },
    canselAllEmployee: (state) => {
      state.selectedСompanies = state.selectedСompanies.map((item) => {
        return { ...item, employees: [] };
      });
    },
    deleteEmployee: (state) => {
      if (state.selectedСompanies && state.companies) {
        state.selectedСompanies.forEach(
          (selectedСompanyItem, indexCompanySelect) => {
            const indexCompany = state.companies.findIndex(
              (i) => i.id === selectedСompanyItem.id
            );

            state.companies[indexCompany].employees = state.companies[
              indexCompany
            ].employees.filter(
              (filterableItem) =>
                !state.selectedСompanies[indexCompanySelect].employees.find(
                  (item) => item.id === filterableItem.id
                )
            );

            state.selectedСompanies[indexCompanySelect] = {
              ...state.selectedСompanies[indexCompanySelect],
              employees: [],
            };
          }
        );

        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    createNewEmployee: (state, action: PayloadAction<string>) => {
      const id = Math.floor(Math.random() * 1000000);

      const indexCompany = state.companies.findIndex(
        (i) => i.id === action.payload
      );

      state.companies[indexCompany].employees.push({
        id: String(id),
        lastName: "",
        firstName: "",
        position: "",
      });

      localStorage.setItem("companies", JSON.stringify(state.companies));
    },
    changeFirstNameEmployee: (
      state,
      action: PayloadAction<{
        companyId: string;
        employeeId: string;
        newFirstName: string;
      }>
    ) => {
      const indexCompany = state.companies.findIndex(
        (i) => i.id === action.payload.companyId
      );

      if (indexCompany >= 0) {
        const indexEmployee = state.companies[indexCompany].employees.findIndex(
          (i) => i.id === action.payload.employeeId
        );
        state.companies[indexCompany].employees[indexEmployee].firstName =
          action.payload.newFirstName;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    changeLastNameEmployee: (
      state,
      action: PayloadAction<{
        companyId: string;
        employeeId: string;
        newLastName: string;
      }>
    ) => {
      const indexCompany = state.companies.findIndex(
        (i) => i.id === action.payload.companyId
      );

      if (indexCompany >= 0) {
        const indexEmployee = state.companies[indexCompany].employees.findIndex(
          (i) => i.id === action.payload.employeeId
        );
        state.companies[indexCompany].employees[indexEmployee].lastName =
          action.payload.newLastName;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },
    changePositionEmployee: (
      state,
      action: PayloadAction<{
        companyId: string;
        employeeId: string;
        newPosition: string;
      }>
    ) => {
      const indexCompany = state.companies.findIndex(
        (i) => i.id === action.payload.companyId
      );

      if (indexCompany >= 0) {
        const indexEmployee = state.companies[indexCompany].employees.findIndex(
          (i) => i.id === action.payload.employeeId
        );
        state.companies[indexCompany].employees[indexEmployee].position =
          action.payload.newPosition;
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
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
  selectEmployee,
  canselEmployee,
  selectAllEmployee,
  canselAllEmployee,
  deleteEmployee,
  createNewEmployee,
  changeFirstNameEmployee,
  changeLastNameEmployee,
  changePositionEmployee,
  rebootCompanies,
} = mainSlice.actions;

export default mainSlice.reducer;
