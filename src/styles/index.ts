import { Alert, Button, Form, Layout } from "antd";
import styled from "styled-components";
const {Header} = Layout;

export const StyledWrapper = styled.div`
background-color: white; 
border-radius: 10px; 
padding: 10px;`;

export const ActionButton = styled(Button)`
    background-color: #ec1954;
    color: white
`

export const SubmitButton = styled(Button)` 
    background-color: #6618ff;
    color:white;
    width: 100%;
`

export const StyledFormInput = styled(Form.Item)`
 & .ant-form-item-label{
    padding: 0
}`

export const StyledHeader = styled(Header)`
    background: #310e77
`
export const StyledAlert = styled(Alert)`
    margin-bottom: 10px;
    font-weight: bold;
`