import TextField from '@mui/material/TextField/TextField';
import EditIcon from '@mui/icons-material/Edit';
import React, {ChangeEvent, useState} from 'react';
import s from "./TextAres.module.css"
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;


type TextAreaType = {
    title: string
    placeholder: string
    callBack: (value: string) => void
}

export const TextArea: React.FC<TextAreaType> = React.memo(({title, placeholder, callBack}) => {
    const [editMode, setEditMode] = useState(false)
    const onclickHandler = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
    }
    return (
        <div className={s.container}>
            {editMode ? <TextField onChange={changeTitleHandler} sx={{
                'textarea': {
                    color: "#fff",
                }
            }} id="standard-textarea" placeholder={placeholder} variant="standard" multiline size={'small'} autoFocus
                                   onBlur={activateViewMode} /> : <h2>{title}</h2>}

            <EditIcon sx={{
                color: "#fff", "&:hover": {
                    transform: "translateY(1px)"
                }
            }} onClick={onclickHandler}/>
        </div>
    )

})
