import { combineReducers } from "redux";

import { reducer as formReducer } from 'redux-form';
import loginPage from './pages/loginReducer';
import adminPage from './pages/adminReducer';
import tccdPage from './pages/tccdReducer';
const rootReducer = combineReducers({
    loginPage,adminPage,tccdPage,
    form: formReducer
});
export default rootReducer;