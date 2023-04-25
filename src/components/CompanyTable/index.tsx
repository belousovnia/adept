import { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  canselAllСompany,
  canselСompany,
  changeAddressСompany,
  changeNameСompany,
  createNewСompany,
  deleteCompanies,
  selectAllСompany,
  selectСompany,
  setCompanies,
} from "../../store/mainSlice";

export default function CompanyTable() {
  const dataCompanies = localStorage.getItem("companies");

  const mainStore = useSelector((state: RootState) => state.mainStore);
  const dispatch = useDispatch();

  const inputSelectAll = useRef();

  function buildLinesCompanies() {
    const linesCompanies = [];
    if (mainStore.companies) {
      for (const key in mainStore.companies) {
        if (Object.prototype.hasOwnProperty.call(mainStore.companies, key)) {
          const element = (
            <div
              className={classNames(styles.CompanyTable__line, {
                [styles.CompanyTable__line_active]:
                  key in mainStore.selectedСompanies,
              })}
              key={key}
            >
              <div
                className={classNames(
                  styles.CompanyTable__cell,
                  styles.CompanyTable__colFirst
                )}
              >
                <input
                  type="checkbox"
                  onClick={(element) => {
                    element.currentTarget.checked
                      ? dispatch(selectСompany(key))
                      : dispatch(canselСompany(key));
                  }}
                  checked={key in mainStore.selectedСompanies}
                />
              </div>
              <div className={styles.CompanyTable__cell}>
                <input
                  className={styles.CompanyTable__input}
                  type="text"
                  onChange={(element) => {
                    console.log(element.target.value);
                    dispatch(
                      changeNameСompany({
                        id: key,
                        newName: element.target.value,
                      })
                    );
                  }}
                  value={mainStore.companies[key].name}
                />
              </div>
              <div className={styles.CompanyTable__cell}>
                {Object.keys(mainStore.companies[key].employees).length}
              </div>
              <div className={styles.CompanyTable__cell}>
                <input
                  className={styles.CompanyTable__input}
                  type="text"
                  onChange={(element) => {
                    console.log(element.target.value);
                    dispatch(
                      changeAddressСompany({
                        id: key,
                        newAddress: element.target.value,
                      })
                    );
                  }}
                  value={mainStore.companies[key].address}
                />
              </div>
            </div>
          );
          linesCompanies.push(element);
        }
      }
    }
    return linesCompanies;
  }

  useEffect(() => {
    if (dataCompanies) dispatch(setCompanies(JSON.parse(dataCompanies)));
  }, []);

  return (
    <div className={styles.CompanyTable}>
      <div className={styles.CompanyTable__body}>
        <div className={styles.CompanyTable__header}>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader,
              styles.CompanyTable__colFirst
            )}
          >
            <input
              type="checkbox"
              onChange={(element) => {
                element.target.checked
                  ? dispatch(selectAllСompany())
                  : dispatch(canselAllСompany());
              }}
            />
          </div>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          >
            Компания
          </div>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          >
            Сотрудники
          </div>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          >
            Адрес
          </div>
        </div>
        {buildLinesCompanies()}
      </div>
      <div className={styles.CompanyTable__footer}>
        <button onClick={() => dispatch(deleteCompanies())}>Удалить</button>
        <button onClick={() => dispatch(createNewСompany())}>
          Новая компания
        </button>
      </div>
    </div>
  );
}
