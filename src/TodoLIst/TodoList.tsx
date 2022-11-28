import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodoListAC, changeFilterTodoListAC, TodoListType} from "../redux/todoList-reducer";
import s from "./TodoList.module.css";
import {StoreType} from "../redux/store";
import {
    addTaskAC,
    TaskStateType,
    changeTaskPriorityAC, deleteTaskAC, taskIsDoneAC, sortTaskAC,
} from "../redux/task-reducer";
import {Button, Checkbox, Stack} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';


export const TodoList: React.FC<TodoListType> = ({
                                                     todoListTitle,
                                                     todoListId,
                                                     filter,
                                                 }) => {
    const dispatch = useDispatch();
    const tasks = useSelector<StoreType, TaskStateType>(
        (state) => state.tasksListData
    );

    const addTaskHandler = () => {
        dispatch(addTaskAC(todoListId));
    };

    const sortTaskHandler = () => {
        debugger
        dispatch(sortTaskAC(todoListId))
    }

    const tasksMap = tasks[todoListId]?.map((task) => {
        const onChangePriority = () => {
            if (!task.isDone) {
                dispatch(changeTaskPriorityAC(task.priority, todoListId, task.taskId, task.isDone));
            }
        };
        const deleteTaskHandler = () => {
            dispatch(deleteTaskAC(todoListId, task.taskId))
        }
        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const isDone = e.currentTarget.checked
            dispatch(taskIsDoneAC(todoListId, task.taskId, isDone))
        }
        return (
            <div
                className={!task.isDone ? `${s.taskContainer} ${s[task.priority]}` : `${s.taskContainer} ${s.isDone}`}
                key={task.taskId}
            >
                <div className={s.taskWrapper}>
                    <div className={s.titleText}>{task.taskTitle}</div>
                    <div>{task.description}</div>
                    <div className={s.wrapperPriority}>
                        <div onClick={onChangePriority} className={s.priorityText}>
                            <div>{task.priority}</div>
                            <ArrowBackIcon fontSize={'small'}/>
                        </div>
                    </div>
                </div>
                <div className={s.checkboxContainer}>
                    <Checkbox sx={{
                        color: '#fff',
                        '&.Mui-checked': {
                            color: "#dce775",
                        },
                    }} onChange={onChangeCheckboxHandler} checked={task.isDone}/>
                </div>
                <div className={s.clearContainer}>
                    <HighlightOffIcon onClick={deleteTaskHandler}/>
                </div>
            </div>
        );
    });

    return (
        <div className={s.container}>
            <div className={s.todoListTitleContainer}>
                <div className={s.title}>{todoListTitle}</div>
                <div className={s.filterContainer}>

                        <span>Filter:</span>
                        <Stack direction="row" spacing={1}>
                            <Button onClick={() => dispatch(changeFilterTodoListAC(todoListId, 'all'))} sx={{fontSize: "10px", border: "1px solid #fff", color: "#fff", minWidth: "max-content"}} variant="outlined">All</Button>
                            <Button onClick={() => dispatch(changeFilterTodoListAC(todoListId, 'active'))} sx={{fontSize: "10px", border: "1px solid #fff", color: "#fff", minWidth: "max-content"}} variant="outlined">Active</Button>
                            <Button onClick={() => dispatch(changeFilterTodoListAC(todoListId, 'completed'))} sx={{fontSize: "10px", border: "1px solid #fff", color: "#fff", minWidth: "max-content"}} variant="outlined" href="#outlined-buttons">Completed</Button>
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
            </div>
            <div className={s.tasksContainer}>{tasksMap}</div>
            <Button
                onClick={addTaskHandler}
                sx={{
                    color: "#000",
                    width: '250px',
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
                Add new task
            </Button>
        </div>
    );
};
