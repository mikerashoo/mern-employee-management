export interface Employee{
    _id: string|null,
    name: string,
    salary: number,
    date_of_birth: string,
    gender: string, 
}

export type Error = string 

export type Fetching = boolean

export type EditModalVisible = boolean

export type SelectedEmployee = Employee

