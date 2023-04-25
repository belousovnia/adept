import styles from "./App.module.scss";
import CompanyTable from "./components/CompanyTable";
import Header from "./components/Header";
import { useEffect } from "react";
import { companiesData } from "./data";

function App() {
  const data = localStorage.getItem("companies");
  
  console.log(data);

  useEffect(() => {
    if (!localStorage.getItem("companies")) localStorage.setItem("companies", JSON.stringify(companiesData));
  }, [])

  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.App__block}>
        <CompanyTable />
      </div>
      <div className={styles.App__block}>
        {/* <CompanyTable /> */}
      </div>
    </div>
  );
}

export default App;
