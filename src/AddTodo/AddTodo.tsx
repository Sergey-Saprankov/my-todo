import React from "react";
import s from './AddTodo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC, TodoListType} from "../redux/todoList-reducer";
import {StoreType} from "../redux/store";


export const AddTodo = () => {
    const dispatch = useDispatch()
    const addTodoListHandler = () => {
        dispatch(addTodoListAC())
    }
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <button className={s.box} onClick={addTodoListHandler}>+ Add new todo</button>
            </div>
        </div>
    )
}