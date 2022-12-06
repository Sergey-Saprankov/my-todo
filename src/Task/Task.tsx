import React, {ChangeEvent, useCallback} from "react";
import s from "../TodoList/TodoList.module.css";
import {TextArea} from "../TextArea/TextArea";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Checkbox} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {TaskType} from "../redux/task-reducer";

type TaskTypeProps = {
    task: TaskType
    todoListId: string
    taskId: string
    deleteTask: (todoListId: string, taskId: string) => void
    onChangeCheckbox: (todoListId: string, taskId: string, value: boolean) => void
    onChangeTaskPriority: (priority: string, todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
}

export const Task: React.FC<TaskTypeProps> = React.memo(({
                                                             task,
                                                             taskId,
                                                             deleteTask,
                                                             onChangeCheckbox,
                                                             changeTaskTitle,
                                                             onChangeTaskPriority,
                                                             todoListId
                                                         }) => {
    const changeTaskTitleByTextArea = useCallback((value: string) => {
        changeTaskTitle(todoListId, taskId, value)
    }, [todoListId, taskId, changeTaskTitle])
    const onChangePriority = () => {
        if (!task.isDone) {
            onChangeTaskPriority(task.priority, todoListId, taskId, task.isDone);
        }
    };

    const deleteTaskHandler = () => {
        deleteTask(todoListId, taskId)
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        onChangeCheckbox(todoListId, taskId, isDone)
    }
    return (
        <div
            className={!task.isDone ? `${s.taskContainer} ${s[task.priority]}` : `${s.taskContainer} ${s.isDone}`}
            key={task.taskId}
        >
            <div className={s.taskWrapper}>
                <TextArea callBack={changeTaskTitleByTextArea}
                          placeholder={'Task title'}
                          title={task.taskTitle}/>
                <div className={s.wrapperPriority}>
                    <div onClick={onChangePriority} className={s.priorityTextContainer}>
                        <div className={s.priorityText}>{task.priority}</div>
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
    )
})