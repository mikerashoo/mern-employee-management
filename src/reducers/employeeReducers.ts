import { ADD_EMPLOYEE, 
    DELETE_EMPLOYEE, 
    EDIT_EMPLOYEE, 
    UPDATE_EMPLOYEE,
    EmployeeActionTypes, 
    FETCH_EMPLOYEES, 
    HIDE_EDIT_MODAL, 
    SAVE_EMPLOYEE, 
    SET_EMPLOYEES, 
    SHOW_EDIT_MODAL,
    SHOW_ERROR } from "../types/actions";
import { Employee } from "../types/Employee";
import { AppState } from "../types/AppStates";
import { message } from "antd";

let INITIAL_STATE: AppState = {
    employees:[],
    fetching: false,
    error: null,
    edit_modal_visible: false,
    selected_employee:null
}; 
const employeeReducers = (state = INITIAL_STATE, action: EmployeeActionTypes) : AppState => {
    switch(action.type){
        /**
        * 
        * Fetch employees from api
        */
        case FETCH_EMPLOYEES: 
        return {
            ...state,
            fetching: true
        }
        /**
        * 
        * Fetch employees from api
        */
        case SHOW_ERROR: 
        return {
            ...state,
            error: action.error,
            fetching: false
        }
        
        /**
        * Set state employees to employees fetched from api
        */
        case SET_EMPLOYEES: 
        return {
            ...state,
            employees: action.employees,
            fetching: false
        } 
        
        /**
        * Save employee to api
        */
        case SAVE_EMPLOYEE: 
        return {
            ...state, 
            fetching: true
        } 
        
        /**
        * Add new employee to current employee list of state
        */
        case ADD_EMPLOYEE:  
        message.success({content: 'Employee saved successfully!', duration: 1}); 
        return {
            ...state,
            employees: state.employees.concat(action.employee),
            fetching: false
        }
        
        /**
        * filter out employee with the same id
        */
        case DELETE_EMPLOYEE:          
        return {
            ...state,
            employees: state.employees.filter(({_id}) => _id !== action._id)
        }

        /**
         * 
         * Set selected employee 
         * Show edit modal for selected employee
         */
        case SHOW_EDIT_MODAL: 
        return {
            ...state,
            selected_employee: action.employee,
            edit_modal_visible: true
        } 

        /**
         * 
         * remove selected employee
         * hide modal
         */
        case HIDE_EDIT_MODAL: 
        return {
            ...state,
            selected_employee: null,
            edit_modal_visible: false
        }
 /**
         * 
         * save edited data to api
         */
        case EDIT_EMPLOYEE: 
        return {
            ...state,
            fetching: true
        }  
        
        
        /* 
         * remove selected employee
         * hide modal
         */
        case UPDATE_EMPLOYEE: 
        let _employees = [...state.employees]; 
        message.success({content: 'Employee updated successfully!', duration: 1}); 

        _employees.forEach((_employee, key) => {
            if(_employee._id == action.employee._id){
                _employees[key] = action.employee;
                return;
            }
        });
        return {
            ...state,
            employees: _employees,
            selected_employee: null,
            edit_modal_visible: false,
            fetching: false,

        }

        /**
         * 
         * Update selected employee data
         */
        
        default: 
        return state; 
    }
    
    
}

export default employeeReducers;