import {put, call, all, takeLatest} from 'redux-saga/effects';   
import {ADD_EMPLOYEE, 
  DELETE_EMPLOYEE,
  FETCH_EMPLOYEES, 
  SAVE_EMPLOYEE,
   DeleteEmployeeAction, 
   SaveEmployeeAction,
    EditEmployeeAction, EDIT_EMPLOYEE, SHOW_ERROR 
   } from '../types/actions';
import {setEmployees, addEmployee, deleteEmployee, updateEmployee, showError} from '../actions/employeeActions';
import {fetchEmployeesCall, saveEmployeeCall, deleteEmployeeCall, updateEmployeeCall} from '../api';  

function* fetchEmployeesSaga() { 
try {
    const employeeData = yield call(fetchEmployeesCall) 
    yield put (setEmployees(employeeData));
  } catch (error) {
    yield put (showError('Problem with fetching employees please try again')); 
  }  
}
 
function* saveEmployeesSaga(action: SaveEmployeeAction) { 
try {
    const employeeData = yield call(saveEmployeeCall, action.employee) 
    yield put (addEmployee(employeeData));
  } catch (error) {
    yield put (showError('Problem with saving new employee please try again'));

    // yield put({error.message))
  }  
}

function* updateEmployeesSaga(action: EditEmployeeAction) { 
try {
    yield call(updateEmployeeCall, action.employee) 
    console.log('saga called');
    yield put (updateEmployee(action.employee));
  } catch (error) {
    yield put (showError('Problem with updating employee please try again'));
    
  }  
}

function* deleteEmployeesSaga(action: DeleteEmployeeAction) { 
try {
    yield call(deleteEmployeeCall, action._id) 
    yield put (deleteEmployee(action._id));
  } catch (error) {
    yield put (showError('Problem with deleting employee please try again'));
    
    // yield put({error.message))
  }  
}

function* employeeSaga(){
  yield all([
    yield takeLatest(FETCH_EMPLOYEES, fetchEmployeesSaga),
    yield takeLatest(SAVE_EMPLOYEE, saveEmployeesSaga),
    yield takeLatest(EDIT_EMPLOYEE, updateEmployeesSaga),
    yield takeLatest(DELETE_EMPLOYEE, deleteEmployeesSaga),
  ]) 
} 
export default employeeSaga;