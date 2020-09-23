import {Form, Input, Select, Radio, Divider, DatePicker, Button, Spin, message} from 'antd'
import React, { Component } from 'react'

import {saveEmployee} from '../actions/employeeActions'
import { AppState } from '../stores'
import { AppActions } from '../types/actions' 
import { bindActionCreators, Dispatch } from 'redux'  
import { connect } from 'react-redux'
import { Employee } from '../types/Employee' 
import {StyledFormInput, StyledWrapper, SubmitButton} from '../styles'
import moment from 'moment'

interface HomeProps {
}
interface HomeStateProps {
    name: string,
    salary: number,
    date_of_birth: string | null,
    gender: string | null,
}

type Props = HomeProps & LinkDispatchProps & LinkStateProps


class EmployeeForm extends Component<Props,  HomeStateProps> {

    constructor(props: Props){
        super(props);
        this.state = {
            name: '',
            salary: 0,
            date_of_birth: null,
            gender: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
    }

    onChange(event:any){
        this.setState({...this.state, [event.target.name]: event.target.value})
    }

    onDateChange(time: any, timeString: string){
        this.setState({...this.state, date_of_birth: timeString})
    }

    handleOnSubmit(){
        let state = this.state; 
        let name = state.name ? state.name : '';
        let salary = state.salary ? state.salary : 0;
        let date_of_birth = state.date_of_birth ? state.date_of_birth : '';
        let gender = state.gender ? state.gender : '';
        if(name.length > 0 && salary > 0 && date_of_birth.length > 0 && gender.length > 0){
            let employee : Employee = { 
                _id: null,
                name: name,
                salary: salary,
                date_of_birth: date_of_birth,
                gender: gender
            }
            this.props.saveEmployee(employee);
            this.setState({
                name: '',
                salary: 0,
                date_of_birth: '',
                gender: ''
            })
        }
        else {
            message.error({content: 'Please enter all fields', duration: 2});
        }        
    }

    
    disabledDate(value:any){
        return  value > moment();
    }; 
    

    render() {
       
        return (
            <Spin spinning={this.props.employeeData.fetching}>
            <StyledWrapper>
            <h2>New Employee Form </h2> 
            <Divider />
            <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                <StyledFormInput label="Full Name" >
                    <Input name="name"  placeholder="Enter full name here" onChange={this.onChange} value={this.state.name}/>
                </StyledFormInput> 
                <StyledFormInput label="Salary"> 
                <Input name="salary" type="number" min="0" onChange={this.onChange} placeholder="Enter salart here" value={this.state.salary}/>
                </StyledFormInput>  
                <StyledFormInput label="Date of birth" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}> 
                <DatePicker style={{width: '100%'}} onChange={this.onDateChange} disabledDate={this.disabledDate} 
                value={this.state.date_of_birth ? moment(this.state.date_of_birth) : moment()}/>
                </StyledFormInput>  
                <StyledFormInput label="Gender" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}> 
                 <Radio.Group name="gender" onChange={this.onChange} value={this.state.gender}>
                     <Radio value="M">Male</Radio>
                     <Radio value="F">Female</Radio>
                 </Radio.Group>
                </StyledFormInput>
                <SubmitButton onClick={this.handleOnSubmit}>Save Employee</SubmitButton>
            </Form>
            </StyledWrapper>
            </Spin>
            )
        }
    }
    
    
interface LinkStateProps { 
    employeeData: AppState
}

interface LinkDispatchProps {
    saveEmployee : (employee: Employee) => void
}


const mapStateToProps = (state: AppState) =>({  
    employeeData: state.employees
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
     
        saveEmployee : bindActionCreators(saveEmployee, dispatch)
    
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);