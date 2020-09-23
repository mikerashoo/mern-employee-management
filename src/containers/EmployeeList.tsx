import { PageHeader, Button, Popconfirm, Table, Alert } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import React, { Component } from 'react'
import { Employee } from '../types/Employee'
import {fetchEmployees, deleteEmployee, showEditModal} from '../actions/employeeActions'
import { AppState } from '../stores'
import { AppActions } from '../types/actions' 
import { bindActionCreators, Dispatch } from 'redux'  
import { connect } from 'react-redux' 
import EditEmployeeForm from '../components/EditEmployeeForm'
import { ActionButton, StyledWrapper, StyledAlert } from '../styles'

interface HomeProps {

}

interface HomeStates {

}

type Props = HomeProps & LinkDispatchProps & LinkStateProps

class EmployeeList extends Component <Props, HomeStates>{
    constructor(props: Props){
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
    }
    componentDidMount() {
        this.props.fetchEmployees();  
    }

    onDelete(_id: any){ 
        this.props.deleteEmployee(_id); 
    }

    showEditModal(employee: Employee){ 
        this.props.showEditModal(employee); 
    }
    
    render() {
        const tableCols: ColumnProps<Employee>[]= [ 
            {
                title: 'Full Name',
                dataIndex: 'name' 
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                render: (value:string) => <span>{value == 'M' ? 'Male' : 'Female'}</span>
            }, 
            {
                title: 'Salary',
                dataIndex: 'salary', 
            }, 
            {
                title: 'Date of Birth',
                dataIndex: 'date_of_birth', 
            },
            {
                render: (value: string, record: Employee) => <>
                    <Button onClick={()=>this.showEditModal(record)} >Edit</Button>
                    <Popconfirm title="Are you sure you want to delete?" onConfirm={()=>this.onDelete(record._id)}>
                        <ActionButton >Delete</ActionButton>
                    </Popconfirm>
                </> 
            }
        ]
        return (
            <StyledWrapper> 
                <PageHeader
                 title="Employee List" />
                 <EditEmployeeForm />
                 {
                     this.props.employeeData.error && <div><StyledAlert message={this.props.employeeData.error} type="error" closable/></div>
                 }

                <Table dataSource={this.props.employeeData.employees} loading={this.props.employeeData.fetching} columns={tableCols} rowKey="id"/>                
            </StyledWrapper>
        )
    }
} 


interface LinkStateProps {
    employeeData: AppState
}

interface LinkDispatchProps {
    fetchEmployees : () => void
    deleteEmployee : (_id: string) => void, 
    showEditModal : (employee: Employee) => void,  
}


const mapStateToProps = (state: AppState) =>({ 
        employeeData: state.employees
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({     
        fetchEmployees : bindActionCreators(fetchEmployees, dispatch),
        deleteEmployee : bindActionCreators(deleteEmployee, dispatch),     
        showEditModal : bindActionCreators(showEditModal, dispatch), 
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);