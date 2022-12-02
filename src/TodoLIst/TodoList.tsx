import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeFilterTodoListAC, FilterTaskType, TodoListType} from "../redux/todoList-reducer";
import s from "./TodoList.module.css";
import {StoreType} from "../redux/store";
import {
    addTaskAC,
    TaskStateType,
    changeTaskPriorityAC, deleteTaskAC, taskIsDoneAC, sortTaskAC, TaskType,
} from "../redux/task-reducer";
import {Button, Checkbox, Stack} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import SettingsIcon from '@mui/icons-material/Settings';
import {Filter} from "../Filter/Filter";
import {logDOM} from "@testing-library/react";
import {TextArea} from "../EditableSpan/TextArea";

type TodoListPropsType = {
    tasks: TaskType[]
    todoListId: string
    todoListTitle: string
    filter: FilterTaskType
    addTaskHandler: (todoListId: string) => void
    sortTasks: (todoListId: string) => void
    changeFilterTodoList: (todoListId: string, filter: FilterTaskType) => void
    onChangeTaskPriority: (priority: string, todoListId: string, taskId: string, isDone: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
    onChangeCheckbox: (todoListId: string, taskId: string, value: boolean) => void
    deleteTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, todoListTitle: string) => void
    changeTaskTitle: (todoListId: string,  taskId: string, taskTitle: string) => void
}


export const TodoList: React.FC<TodoListPropsType> = React.memo(({
                                                                     todoListTitle,
                                                                     todoListId,
                                                                     filter,
                                                                     tasks,
                                                                     addTaskHandler,
                                                                     sortTasks,
                                                                     changeFilterTodoList,
                                                                     onChangeTaskPriority,
                                                                     deleteTask,
                                                                     onChangeCheckbox,
                                                                     deleteTodoList,
                                                                     changeTodoListTitle,
                                                                     changeTaskTitle
                                                                 }) => {

    const filteredTasks = [...tasks.map(t => ({...t})).filter(t => filter === "active" ? !t.isDone : filter === "completed" ? t.isDone : t)]
    const addOnClickTaskHandler = () => {
        addTaskHandler(todoListId)
    };

    const removeTodoListHandler = () => {
        deleteTodoList(todoListId)
    }
    const sortTasksByFilter = useCallback(() => sortTasks(todoListId), [todoListId])
    const changeFilterByFilter = useCallback((filter: FilterTaskType) => {
        changeFilterTodoList(todoListId, filter)
    }, [todoListId, filter])
    const changeTodoListTitleByTextArea = useCallback((value: string) => {
        changeTodoListTitle(todoListId, value)
    }, [todoListId])


    const tasksMap = filteredTasks?.map((task) => {
        const changeTaskTitleByTextArea = (value: string) => {
            changeTaskTitle(todoListId, task.taskId, value)
        }
        const onChangePriority = () => {
            if (!task.isDone) {
                onChangeTaskPriority(task.priority, todoListId, task.taskId, task.isDone);
            }
        };
        const deleteTaskHandler = () => {
            deleteTask(todoListId, task.taskId)
        }
        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const isDone = e.currentTarget.checked
            onChangeCheckbox(todoListId, task.taskId, isDone)
        }
        return (
            <div
                className={!task.isDone ? `${s.taskContainer} ${s[task.priority]}` : `${s.taskContainer} ${s.isDone}`}
                key={task.taskId}
            >
                <div className={s.taskWrapper}>
                    <TextArea callBack={changeTaskTitleByTextArea}  placeholder={'Task title'} title={task.taskTitle}/>
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
            <div className={s.todoListClose}>
                <HighlightOffIcon onClick={removeTodoListHandler} sx={{
                    color: "#b2102f", '&:hover': {
                        transform: "translateY(1px)"
                    }
                }}/>
            </div>
            <div className={s.wrapper}>
                <div className={s.todoListTitleContainer}>
                    {/*<div className={s.title}>{todoListTitle}</div>*/}
                    <TextArea callBack={changeTodoListTitleByTextArea} placeholder={'Todo List title'} title={todoListTitle}/>
                    <Filter changeFilterByFilter={changeFilterByFilter} sortTasksByFilter={sortTasksByFilter}
                            filter={filter} todoListId={todoListId}/>
                </div>
                <div className={s.tasksContainer}>{tasksMap}</div>
                <Button
                    onClick={addOnClickTaskHandler}
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
                </Button></div>
        </div>
    );
});
