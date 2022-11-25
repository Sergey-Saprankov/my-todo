import { taskReducer } from './task-reducer';
import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./todoList-reducer";


const rootReducer = combineReducers({
    todoListData: todoListReducer,
    tasksListData: taskReducer
})

export type StoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

