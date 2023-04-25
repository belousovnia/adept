import { useRef } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  canselAllEmployee,
  canselEmployee,
  changeFirstNameEmployee,
  changeLastNameEmployee,
  changePositionEmployee,
  deleteEmployee,
  selectAllEmployee,
  selectEmployee,
} from "../../store/mainSlice";

export default function EmployeesTable() {
  const mainStore = useSelector((state: RootState) => state.mainStore);
  const dispatch = useDispatch();

  const inputSelectAll = useRef<HTMLInputElement>(null);

  function buildEmployees() {
    return mainStore.companies.map((item) => {
      if (mainStore.selectedСompanies.find((i) => i.id === item.id)) {
        const selectedСompany = mainStore.selectedСompanies.find(
          (i) => i.id === item.id
        );
        return item.employees.map((employee) => {
          return (
            <div
              className={classNames(styles.CompanyTable__line, {
                [styles.CompanyTable__line_active]: selectedСompany
                  ? selectedСompany.employees.length &&
                    !!selectedСompany.employees.find(
                      (i3) => i3.id === employee.id
                    )
                  : false,
              })}
              key={employee.id}
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
                      ? dispatch(
                          selectEmployee({
                            companyId: item.id,
                            employeeId: employee.id,
                          })
                        )
                      : dispatch(
                          canselEmployee({
                            companyId: item.id,
                            employeeId: employee.id,
                          })
                        );
                  }}
                  checked={
                    selectedСompany
                      ? !!selectedСompany.employees.find(
                          (i3) => i3.id === employee.id
                        )
                      : false
                  }
                />
              </div>
              <div className={styles.CompanyTable__cell}>
                <input
                  className={styles.CompanyTable__input}
                  type="text"
                  onChange={(element) => {
                    dispatch(
                      changeFirstNameEmployee({
                        companyId: item.id,
                        employeeId: employee.id,
                        newFirstName: element.target.value,
                      })
                    );
                  }}
                  value={employee.firstName}
                />
              </div>
              <div className={styles.CompanyTable__cell}>
                <input
                  className={styles.CompanyTable__input}
                  type="text"
                  onChange={(element) => {
                    dispatch(
                      changeLastNameEmployee({
                        companyId: item.id,
                        employeeId: employee.id,
                        newLastName: element.target.value,
                      })
                    );
                  }}
                  value={employee.lastName}
                />
              </div>
              <div className={styles.CompanyTable__cell}>
                <input
                  className={styles.CompanyTable__input}
                  type="text"
                  onChange={(element) => {
                    dispatch(
                      changePositionEmployee({
                        companyId: item.id,
                        employeeId: employee.id,
                        newPosition: element.target.value,
                      })
                    );
                  }}
                  value={employee.position}
                />
              </div>
            </div>
          );
        });
      }
    });
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
                  ? dispatch(selectAllEmployee())
                  : dispatch(canselAllEmployee());
              }}
            />
          </div>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          >
            Имя
          </div>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          >
            Фамилия
          </div>
          <div
            className={classNames(
              styles.CompanyTable__cell,
              styles.CompanyTable__colHeader
            )}
          >
            Должность
          </div>
        </div>
        {buildEmployees()}
      </div>
      <div className={styles.CompanyTable__footer}>
        <button
          className={styles.CompanyTable__footerButton}
          onClick={() => dispatch(deleteEmployee())}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
