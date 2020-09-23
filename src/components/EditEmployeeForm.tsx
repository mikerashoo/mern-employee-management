import {  Form, Input, Radio, DatePicker, Spin, Modal, message } from 'antd' 
import React, { Component } from 'react' 
import {hideEditModal, editEmployee} from '../actions/employeeActions'
import { AppState } from '../stores'
import { AppActions } from '../types/actions' 
import { bindActionCreators, Dispatch } from 'redux'  
import { connect } from 'react-redux' 
import moment from 'moment';
import { Employee } from '../types/Employee'
import { DatePickerProps } from 'antd/lib/date-picker' 
interface HomeProps {
}
interface HomeStateProps {
    name: string | null,
    salary: number | null,
    date_of_birth: string | null,
    gender: string | null,
}

type Props = HomeProps & LinkDispatchProps & LinkStateProps

class EditEmployeeForm extends Component <Props, HomeStateProps>{
    nameRef:  React.RefObject<Input>;
    salaryRef:  React.RefObject<Input>;
    dateRef: any
    genderRef: React.RefObject<HTMLDivElement>
    
    constructor(props: Props){
        super(props); 
        this.state = {
            name: null,
            salary: null,
            gender: null,
            date_of_birth: null
        }

        this.nameRef = React.createRef<Input>();
        this.salaryRef = React.createRef<Input>();
        this.dateRef = React.createRef<DatePickerProps>();
        this.genderRef = React.createRef<HTMLDivElement>();
        
        this.onChange = this.onChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
 

    onChange(event:any){      
        this.setState({...this.state, [event.target.name]: event.target.value})
    }
    
    onDateChange(time: any, timeString: string){
        this.setState({...this.state,  date_of_birth: timeString})
    }
    
    handleOnSubmit(){
        // console.log(this.state)
        let state = this.state; 
        let name = state.name != null ? state.name : this.props.employeeData.selected_employee.name;
        let salary = state.salary != null ? state.salary : this.props.employeeData.selected_employee.salary;
        let date_of_birth = state.date_of_birth != null ? state.date_of_birth : this.props.employeeData.selected_employee.date_of_birth;
        let gender = state.gender != null ? state.gender : this.props.employeeData.selected_employee.gender;
        
        let _employee = { 
            _id: this.props.employeeData.selected_employee._id,
            name: name,
            salary: salary, 
            date_of_birth: date_of_birth,
            gender: gender
        } 
   
        if(name.length > 0 && salary > 0 && date_of_birth.length > 0 && gender.length > 0){
            this.props.editEmployee(_employee);
            
        }
        else {
            message.error({content: 'Please enter all fields', duration: 2});
        }  
        console.log(_employee);
        return; 

        
    }
 
    
    render() {
        let nameValue = this.props.employeeData.selected_employee ? this.props.employeeData.selected_employee.name : '';
        let salaryValue = this.props.employeeData.selected_employee ? this.props.employeeData.selected_employee.salary : 0;
        let genderValue = this.props.employeeData.selected_employee ? this.props.employeeData.selected_employee.gender : '';
        let dateOfBirthValue = this.props.employeeData.selected_employee ? this.props.employeeData.selected_employee.date_of_birth : '';
        
        return (
            <Modal 
            visible={this.props.employeeData.edit_modal_visible}
            onCancel={()=>this.props.hideEditModal()} 
            destroyOnClose
            onOk={()=>this.handleOnSubmit()} 
            title="Edit Employee Form">
            <Spin spinning={this.props.employeeData.fetching}>
            
            <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <Form.Item label="Full Name" >
            <Input name="name" defaultValue={nameValue} placeholder="Enter full name here" onChange={this.onChange}/>
            </Form.Item> 
            <Form.Item label="Salary"> 
            <Input name="salary" type="number" ref={this.salaryRef} defaultValue={salaryValue} min="0" onChange={this.onChange} placeholder="Enter full name here" />
            </Form.Item>  
            <Form.Item label="Date of birth" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}> 
            <DatePicker style={{width: '100%'}} ref={this.dateRef} defaultValue={moment(dateOfBirthValue)} onChange={this.onDateChange}/>
            </Form.Item>  
            <Form.Item label="Gender" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}> 
            <Radio.Group name="gender" onChange={this.onChange} ref={this.genderRef} defaultValue={genderValue} >
            <Radio value="M">Male</Radio>
            <Radio value="F">Female</Radio>
            </Radio.Group>
            </Form.Item> 
            </Form>
            </Spin>
            
            </Modal>
            
            )
        }
    } 
    
    
    interface LinkStateProps {
        employeeData: AppState
    }
    
    interface LinkDispatchProps {
        hideEditModal : () => void,
        editEmployee : (employee: Employee) => void,
    }
    
    
    const mapStateToProps = (state: AppState) =>({ 
        employeeData: state.employees
    });
    
    const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({      
        hideEditModal : bindActionCreators(hideEditModal, dispatch),    
        editEmployee : bindActionCreators(editEmployee, dispatch),    
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(EditEmployeeForm);