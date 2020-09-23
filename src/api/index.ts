import axios from 'axios';
import {FETCH_EMPLOYEES_URL, SAVE_EMPLOYEE_URL, DELETE_EMPLOYEE_URL, UPDATE_EMPLOYEE_URL} from '../constants';  
import { Employee } from '../types/Employee';

export const fetchEmployeesCall = async () => {
    const call = await axios.get(FETCH_EMPLOYEES_URL); 
    let response = call.data;  
    let data = response.data;
    return await data;
  }

export const saveEmployeeCall = async (employee: Employee) => {
    const call = await axios.post(SAVE_EMPLOYEE_URL, employee); 
    let response = await call.data;  
    let _employee = {
      ...employee,
      id: response.id, 
    }
    return await _employee;
  }

export const updateEmployeeCall = async (employee: Employee) => {
    return await axios.put(UPDATE_EMPLOYEE_URL + employee._id, employee); 
  }

export const deleteEmployeeCall = async (_id: string) => {
    return await axios.delete(DELETE_EMPLOYEE_URL + _id); 
  }