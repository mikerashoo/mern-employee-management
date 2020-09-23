import React from 'react'; 
import './App.css';  
import 'antd/dist/antd.css';
import {Row, Col, Layout} from 'antd';
import EmployeeList from './containers/EmployeeList';
import EmployeeForm from './containers/EmployeeForm';
import { StyledHeader } from './styles';

const {Content} = Layout;
const App = () => (
    <div>
    <Layout>
    <StyledHeader >
        <h1 style={{color: "white"}}>Addis Employee Management System</h1>
    </StyledHeader>
    </Layout>
    <Layout>
    <Content style={{minHeight: '100vh', padding: '2%'}}>
    <Row gutter={[16, 16]}>
    <Col span={18}>
    <EmployeeList />
    </Col>
    <Col span={6}>
    <EmployeeForm />
    </Col>
    </Row>
    </Content>
    </Layout>
    
    
    </div>
    );
    
    export default App;