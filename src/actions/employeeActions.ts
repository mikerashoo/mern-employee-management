import { Employee } from '../types/Employee';
import { ADD_EMPLOYEE, 
    SAVE_EMPLOYEE, 
    DELETE_EMPLOYEE, 
    SHOW_EDIT_MODAL,
    HIDE_EDIT_MODAL,
    EDIT_EMPLOYEE,
    UPDATE_EMPLOYEE, 
    SET_EMPLOYEES, 
    FETCH_EMPLOYEES,
    SHOW_ERROR,
     AppActions } from '../types/actions'; 

  
export const fetchEmployees = (): AppActions => ({    
    type: FETCH_EMPLOYEES,
}) 

export const setEmployees = (employees: Employee[]): AppActions => ({    
    type: SET_EMPLOYEES,
    employees    
})

export const addEmployee = (employee: Employee): AppActions => ({    
    type: ADD_EMPLOYEE,
    employee    
})
export const saveEmployee = (employee: Employee): AppActions => ({    
    type: SAVE_EMPLOYEE,
    employee    
})

export const showEditModal = (employee: Employee): AppActions => ({    
    type: SHOW_EDIT_MODAL, 
    employee
})

export const hideEditModal = (): AppActions => ({    
    type: HIDE_EDIT_MODAL, 
})
export const editEmployee = (employee: Employee): AppActions => ({    
    type: EDIT_EMPLOYEE,
    employee    
})

export const updateEmployee = (employee: Employee): AppActions => ({    
    type: UPDATE_EMPLOYEE,
    employee    
})

export const deleteEmployee = (_id: string): AppActions => ({    
    type: DELETE_EMPLOYEE, 
    _id    
})

export const showError = (error: string): AppActions => ({    
    type: SHOW_ERROR, 
    error
})
