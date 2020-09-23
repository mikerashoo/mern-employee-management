import {Error, Fetching, Employee, EditModalVisible, SelectedEmployee } from './Employee';

export interface AppState {
    employees: Employee[],
    error: Error | null,
    fetching: Fetching,
    edit_modal_visible: EditModalVisible,
    selected_employee: SelectedEmployee | null 
}