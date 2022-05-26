import { combineReducers } from "redux";
// import header from './../duck/layout/headerReducer'
import { reducer as formReducer } from 'redux-form';
import homePage from './pages/userReducer';
import coursePage from './pages/courseReducer';
import loginPage from './pages/loginReducer';
import contentPage from './pages/contentReducer';
import listPage from './pages/listReducer';
import searchPage from './pages/searchReducer';
import createPage from './pages/createReducer';
import assignmentPage from './pages/assignReducer';
import addPage from './pages/addReducer';
const rootReducer = combineReducers({
    homePage,coursePage,loginPage,contentPage,listPage,searchPage,createPage,assignmentPage,addPage,
    form: formReducer
});
export default rootReducer;