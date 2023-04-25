export interface CompaniesType {
  id: string;
  name: string;
  employees: EmployeType[];
  address: string;
}

export interface EmployeType {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
}
