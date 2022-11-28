import { taskReducer } from './task-reducer';
import {combineReducers, compose, createStore} from "redux";
import {todoListReducer} from "./todoList-reducer";


// declare global {
//     interface  Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

const rootReducer = combineReducers({
    todoListData: todoListReducer,
    tasksListData: taskReducer
})



// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer)

export type StoreType = ReturnType<typeof rootReducer>



// @ts-ignore
// windows.store = store;