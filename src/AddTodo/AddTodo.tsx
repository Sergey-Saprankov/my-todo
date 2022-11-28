import React from "react";
import s from './AddTodo.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC, TodoListType} from "../redux/todoList-reducer";
import {StoreType} from "../redux/store";
import AddIcon from "@mui/icons-material/Add";
import {Button} from "@mui/material";


export const AddTodo = () => {
    const dispatch = useDispatch()
    const addTodoListHandler = () => {
        dispatch(addTodoListAC())
    }
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <Button
                    onClick={addTodoListHandler}
                    sx={{
                        color: "#000",
                        width: '200px',
                        alignSelf: 'center',
                        background: "#fff",
                        fontWeight: "bold",
                        '&:hover': {
                            transform: "translateY(-1px)",
                            backgroundColor: '#fff',
                            borderColor: '#0062cc',
                            boxShadow: 'none',
                        },
                    }} variant="contained" endIcon={<AddIcon/>}>
                    Add new todo
                </Button>
            </div>
        </div>
    )
}