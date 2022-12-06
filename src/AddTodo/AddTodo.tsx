import React from "react";
import s from './AddTodo.module.css'
import AddIcon from "@mui/icons-material/Add";
import {SuperButton} from "../SuperButton/SuperButton";


type AddTodoType = {
    addTodoList: () => void
}

export const AddTodo: React.FC<AddTodoType> = React.memo(({addTodoList}) => {
    const addTodoListHandler = () => {
        addTodoList()
    }
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <SuperButton
                    callBack={addTodoListHandler}
                    title={'Add new Todo'}
                    endIcon={<AddIcon/>}
                    backgroundColor={'#a7bcdc'}
                    color={'#7a0000'}/>
            </div>
        </div>
    )
})