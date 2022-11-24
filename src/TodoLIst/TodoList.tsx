import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC, TodoListType} from "../redux/todoList-reducer";
import s from './TodoList.module.css'



export const TodoList: React.FC<TodoListType> = ({todoListTitle, todoListId, filter}) => {
    const dispatch = useDispatch()
    const addTodoListHandler = () => {
        dispatch(addTodoListAC())
    }
    return (
        <div className={s.container}>
            <div className={s.title}>{todoListTitle}</div>
        </div>
    )
}