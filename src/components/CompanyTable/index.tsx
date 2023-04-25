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
  createNewEmployee,
  createNewСompany,
  deleteCompanies,
  rebootCompanies,
  selectAllСompany,
  selectСompany,
} from "../../store/mainSlice";

export default function CompanyTable() {
  const dataCompanies = localStorage.getItem("companies");

  const mainStore = useSelector((state: RootState) => state.mainStore);
  const dispatch = useDispatch();

  const inputSelectAll = useRef<HTMLInputElement>(null);

  function buildLinesCompanies() {
    return mainStore.companies.map((item) => (
      <div
        className={classNames(styles.CompanyTable__line, {
          [styles.CompanyTable__line_active]:
            !!mainStore.selectedСompanies.find((i) => i.id === item.id),
        })}
        key={item.id}
      >
        <div
          className={classNames(
            styles.CompanyTable__cell,
            styles.CompanyTable__colFirst
          )}
        >
          <input
            type="checkbox"
            onChange={(element) => {
              if (inputSelectAll.current)
                inputSelectAll.current.checked = false;
              element.currentTarget.checked
                ? dispatch(selectСompany(item.id))
                : dispatch(canselСompany(item.id));
            }}
            checked={
              !!mainStore.selectedСompanies.find((i) => i.id === item.id)
            }
          />
        </div>
        <div className={styles.CompanyTable__cell}>
          <input
            className={styles.CompanyTable__input}
            type="text"
            onChange={(element) => {
              dispatch(
                changeNameСompany({
                  id: item.id,
                  newName: element.target.value,
                })
              );
            }}
            value={item.name}
          />
        </div>
        <div className={styles.CompanyTable__cell}>{item.employees.length}</div>
        <div className={styles.CompanyTable__cell}>
          <input
            className={styles.CompanyTable__input}
            type="text"
            onChange={(element) => {
              dispatch(
                changeAddressСompany({
                  id: item.id,
                  newAddress: element.target.value,
                })
              );
            }}
            value={item.address}
          />
        </div>
        <div
          className={classNames(
            styles.CompanyTable__cell,
            styles.CompanyTable__colHeader
          )}
        >
          <button onClick={() => dispatch(createNewEmployee(item.id))}>
            +1 Сотрудник
          </button>
        </div>
      </div>
    ));
  }

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
              ref={inputSelectAll}
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
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          ></div>
        </div>
        {buildLinesCompanies()}
      </div>
      <div className={styles.CompanyTable__footer}>
        <button
          className={styles.CompanyTable__footerButton}
          onClick={() => dispatch(deleteCompanies())}
        >
          Удалить
        </button>
        <button
          className={styles.CompanyTable__footerButton}
          onClick={() => dispatch(createNewСompany())}
        >
          Новая компания
        </button>
        <button
          className={styles.CompanyTable__footerButton}
          onClick={() => dispatch(rebootCompanies())}
        >
          Сбросить таблицу
        </button>
      </div>
    </div>
  );
}
