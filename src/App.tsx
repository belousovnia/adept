import styles from "./App.module.scss";
import CompanyTable from "./components/CompanyTable";
import Header from "./components/Header";
import { useEffect } from "react";
import { companiesData } from "./data";
import EmployeesTable from "./components/EmployeesTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { rebootCompanies } from "./store/mainSlice";

function App() {
  const mainStore = useSelector((state: RootState) => state.mainStore);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("companies")) dispatch(rebootCompanies());
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.App__block}>
        <CompanyTable />
      </div>
      <div className={styles.App__block}>
        {mainStore.selectedСompanies.length ? <EmployeesTable /> : ""}
      </div>
    </div>
  );
}

export default App;
