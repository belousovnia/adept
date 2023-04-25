export interface CompaniesType {
  [id: string]: {
    name: string;
    employees: { [id: string]: EmployeType };
    address: string;
  };
}

export interface EmployeType {
  firstName: string;
  lastName: string;
  position: string;
}
