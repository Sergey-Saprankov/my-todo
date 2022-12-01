import React, {useState} from "react";
import s from "../TodoLIst/TodoList.module.css";
import SettingsIcon from "@mui/icons-material/Settings";
import {Button, Stack} from "@mui/material";
import {changeFilterTodoListAC, FilterTaskType} from "../redux/todoList-reducer";
import SortIcon from "@mui/icons-material/Sort";
import {useDispatch} from "react-redux";
import {sortTaskAC} from "../redux/task-reducer";
import style from "./Filter.module.css"

type FilterType = {
    filter: FilterTaskType
    todoListId: string
}

export const Filter: React.FC<FilterType> = ({todoListId, filter}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch();
    const sortTaskHandler = () => {
        dispatch(sortTaskAC(todoListId))
    }
    return (
        <div className={style.filterContainer}>
            {
                visible && <div className={s.filterContainer}>
                    <span>Filter:</span>
                    <Stack direction="row" spacing={1}>
                        <Button onClick={() => dispatch(changeFilterTodoListAC(todoListId, 'all'))} sx={{
                            fontSize: "10px",
                            border: filter === 'all' ? '1px solid #3f51b5' : '1px solid #fff',
                            color: "#fff",
                            minWidth: "max-content"
                        }} variant="outlined">All</Button>
                        <Button onClick={() => dispatch(changeFilterTodoListAC(todoListId, 'active'))} sx={{
                            fontSize: "10px",
                            border: filter === 'active' ? '1px solid #3f51b5' : '1px solid #fff',
                            color: "#fff",
                            minWidth: "max-content"
                        }} variant="outlined">Active</Button>
                        <Button onClick={() => dispatch(changeFilterTodoListAC(todoListId, 'completed'))} sx={{
                            fontSize: "10px",
                            border: filter === 'completed' ? '1px solid #3f51b5' : '1px solid #fff',
                            color: "#fff",
                            minWidth: "max-content"
                        }} variant="outlined" href="#outlined-buttons">Completed</Button>
                    </Stack>
                    <SortIcon onClick={sortTaskHandler} sx={{
                        color: '#fff',
                        alignSelf: 'center',
                        '&:hover': {
                            transform: "translateY(-1px)",
                        },
                        '&:active': {
                            transform: "translateY(2px)",
                        }
                    }}/>
                </div>
            }

            <SettingsIcon onClick={() => setVisible(!visible)} sx={{
                color: '#fff',
                '&:hover': {
                    animation: "rotate 3s linear"
                },
                "@keyframes rotate": {
                    "0%": {
                        transform: "rotate(0deg)"
                    },
                    "50%": {
                        transform: " rotate(180deg)"
                    },
                    "100%": {
                        transform: "rotate(360deg)"
                    }
                }

            }}/>
        </div>
    )
}