import React, {useCallback} from "react";
import {FilterTaskType} from "../redux/todoList-reducer";
import s from "./TodoList.module.css";
import {TaskType,} from "../redux/task-reducer";
import {Button, Checkbox, Stack, SvgIconTypeMap} from "@mui/material"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import {Filter} from "../Filter/Filter";
import {TextArea} from "../TextArea/TextArea";
import {Task} from "../Task/Task";

import {SuperButton} from "../SuperButton/SuperButton";

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
    changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
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
    const addOnClickTaskHandler = useCallback(() => {
        addTaskHandler(todoListId)
    }, [todoListId, addTaskHandler]);

    const removeTodoListHandler = () => {
        deleteTodoList(todoListId)
    }
    const sortTasksByFilter = useCallback(() => sortTasks(todoListId), [todoListId, sortTasks])
    const changeFilterByFilter = useCallback((filter: FilterTaskType) => {
        changeFilterTodoList(todoListId, filter)
    }, [todoListId, filter, changeFilterTodoList])
    const changeTodoListTitleByTextArea = useCallback((value: string) => {
        changeTodoListTitle(todoListId, value)
    }, [todoListId, changeTodoListTitle])

    const tasksMap = filteredTasks?.map((t) => {

        return (
            <Task task={t}
                  todoListId={todoListId}
                  taskId={t.taskId}
                  deleteTask={deleteTask}
                  onChangeCheckbox={onChangeCheckbox}
                  onChangeTaskPriority={onChangeTaskPriority}
                  changeTaskTitle={changeTaskTitle}
                  key={t.taskId}
            />
        );
    });

    return (
        <div className={s.container}>
            <div className={s.todoListClose}>
                <HighlightOffIcon onClick={removeTodoListHandler} sx={{
                    color: "#fff", '&:hover': {
                        transform: "translateY(1px)"
                    }
                }}/>
            </div>
            <div className={s.wrapper}>
                <div className={s.todoListTitleContainer}>
                    {/*<div className={s.title}>{todoListTitle}</div>*/}
                    <TextArea callBack={changeTodoListTitleByTextArea}
                              placeholder={'Todo List title'}
                              title={todoListTitle}/>
                    <Filter
                        changeFilterByFilter={changeFilterByFilter}
                        sortTasksByFilter={sortTasksByFilter}
                        filter={filter} todoListId={todoListId}/>
                </div>
                <div className={s.tasksContainer}>
                    {tasksMap}
                </div>
                <SuperButton callBack={addOnClickTaskHandler}
                             endIcon={<AddIcon/>}
                             title={'Add new task'}
                             backgroundColor={'#a7bcdc'}
                             color={'#7a0000'}
                />
            </div>
        </div>
    );
});


