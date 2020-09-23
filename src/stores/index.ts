import { Reducer } from 'react';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import employeeReducers from '../reducers/employeeReducers';
import employeeSaga from '../saga'
import { AppActions } from '../types/actions'; 
const sagaMiddleware = createSagaMiddleware();

export const rootReducer: Reducer<any, AppActions> = combineReducers({
    employees: employeeReducers
});

export type AppState = ReturnType<typeof rootReducer>
  
// const configureStore = () => {
    
//     return store;
//   };
  
  const store: AppState = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(employeeSaga);
export default store;

