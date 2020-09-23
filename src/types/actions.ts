import { Employee } from "./Employee";

export const SAVE_EMPLOYEE = "SAVE_EMPLOYEE";
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const SHOW_EDIT_MODAL = "SHOW_EDIT_MODAL";
export const HIDE_EDIT_MODAL = "HIDE_EDIT_MODAL"; 
export const EDIT_EMPLOYEE = "EDIT_EMPLOYEE";
export const UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE";
export const DELETE_EMPLOYEE = "DELETE_EMPLOYEE";
export const SET_EMPLOYEES = "SET_EMPLOYEES";
export const FETCH_EMPLOYEES = "FETCH_EMPLOYEES"; 
export const SHOW_ERROR = "SHOW_ERROR";
export interface SaveEmployeeAction {
    type: typeof SAVE_EMPLOYEE,
    employee: Employee
}
export interface AddEmployeeAction {
    type: typeof ADD_EMPLOYEE,
    employee: Employee
}

export interface EditEmployeeAction {
    type: typeof EDIT_EMPLOYEE,
    employee: Employee
}

export interface UpdateEmployeeAction {
    type: typeof UPDATE_EMPLOYEE,
    employee: Employee
}

export interface ShowEditEmployeeAction {
    type: typeof SHOW_EDIT_MODAL, 
    employee: Employee
}

export interface hideEditEmployeeAction {
    type: typeof HIDE_EDIT_MODAL, 
}

export interface DeleteEmployeeAction {
    type: typeof DELETE_EMPLOYEE,
    _id: string
}

export interface SetEmployeeAction {
    type: typeof SET_EMPLOYEES,
    employees: Employee[]
}

export interface FetchEmployeeAction {
    type: typeof FETCH_EMPLOYEES, 
}
export interface ShowErrorAction {
    type: typeof SHOW_ERROR, 
    error: string
}

export type EmployeeActionTypes = AddEmployeeAction | SaveEmployeeAction | 
EditEmployeeAction | 
UpdateEmployeeAction | 
ShowEditEmployeeAction | 
hideEditEmployeeAction | 
DeleteEmployeeAction | 
SetEmployeeAction | 
ShowErrorAction | 
FetchEmployeeAction;

export type AppActions = EmployeeActionTypes;