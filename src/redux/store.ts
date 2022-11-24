import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./todoList-reducer";

const rootReducer = combineReducers({
    todoListData: todoListReducer
})

export type StoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

