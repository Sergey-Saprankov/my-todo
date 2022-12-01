import {ActionType} from "../type/type";
import {v1} from "uuid";

type PriorityType = 'high' | 'middle' | "low" | 'done';

export type TaskType = {
    taskId: string
    taskTitle: string
    priority: string
    description: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: TaskType[]
}


const initialStateTask: TaskStateType = {}


export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskPriorityACType = ReturnType<typeof changeTaskPriorityAC>
export type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
export type TaskIsDoneACType = ReturnType<typeof taskIsDoneAC>
export type SortTaskACType = ReturnType<typeof sortTaskAC>

export const taskReducer = (state: TaskStateType = initialStateTask, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'ADD-TODO-LIST':
            return {...state, [action.todoListId]: []}

        case 'ADD-TASK':
            const newTask: TaskType = {
                taskId: v1(),
                taskTitle: 'new task',
                description: 'description',
                priority: "low",
                isDone: false
            }
            return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

        case 'CHANGE-PRIORITY':
            const priorityList = ['high', 'middle', 'low'];
            const index = priorityList.indexOf(action.priority);
            const newPriority = action.isDone ? 'done' : index === priorityList.length - 1 ? priorityList[0] : priorityList[index + 1]
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(task => task.taskId === action.taskId ? {
                        ...task,
                        priority: newPriority
                    } : task)
            }

        case "DELETE_TASK":
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.taskId !== action.taskId)}
        case "TASK-IS-DONE":
            const taskIsDone = action.isDone ? "done" : 'low';
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.taskId === action.taskId ? {
                    ...t,
                    priority: taskIsDone,
                    isDone: action.isDone
                } : t)
            }
        case "SORT-TASK":
            return {...state, [action.todoListId]: state[action.todoListId].map(t => ({...t})).sort((a, b) => {
                    return a.priority === 'high' && b.priority === 'low' ? 1 : a.priority === 'high' && b.priority === 'middle'
                        ? 1 : a.priority === 'high' && b.priority === 'done' ? 1 : a.priority === 'middle' && b.priority === 'low' ? 1 :
                            a.priority === 'middle' && b.priority === 'done' ? 1 : a.priority === 'low' && b.priority === 'done' ? 1 : -1;
                }).reverse()}
        default:
            return state;
    }
}


export const addTaskAC = (todoListId: string) => {
    return {
        type: "ADD-TASK",
        todoListId
    } as const
}

export const changeTaskPriorityAC = (priority: string, todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-PRIORITY',
        priority,
        todoListId,
        taskId,
        isDone
    } as const
}

export const deleteTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "DELETE_TASK",
        todoListId,
        taskId
    } as const
}

export const taskIsDoneAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: "TASK-IS-DONE",
        todoListId,
        taskId,
        isDone
    } as const
}


export const sortTaskAC = (todoListId: string) => {
    return {
        type: "SORT-TASK",
        todoListId,
    } as const
}