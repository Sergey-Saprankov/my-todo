import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../redux/store";
import {TaskStateType} from "../redux/task-reducer";
import {TodoListType} from "../redux/todoList-reducer";


// type EditableSpanPropsType = {
//     title: string
// }

export const EditableSpan = () => {
    const dispatch = useDispatch();
    // const tasks = useSelector<StoreType, TaskStateType>(state => state.tasksListData)
    // const todoLists = useSelector<StoreType, TodoListType[]>(state => state.todoListData)
    const [editMode, setEditMode] = useState(false)
    // const activateEditMode = () => {
    //     setEditMode(true);
    //     setTitle(props.value);
    // }
    // const activateViewMode = () => {
    //     setEditMode(false);
    //     props.onChange(title);
    // }
    // const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }

    return editMode
        // ?    <TextField variant="outlined"
        //                 value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        // : <span onDoubleClick={activateEditMode}>{props.value}</span>
}
