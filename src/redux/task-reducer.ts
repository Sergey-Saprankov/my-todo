import {ActionType} from "../type/type";
import {v1} from "uuid";

type PriorityType = 'high' | 'middle' | "low";

export type TaskType = {
    taskId: string
    taskTitle: string
    priority: string
    description: string
}

export type TaskStateType = {
    [key: string]: TaskType[]
} 


const initialStateTask: TaskStateType  = {

}


export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskPriorityACType = ReturnType<typeof changeTaskPriorityAC>

export const taskReducer = (state: TaskStateType = initialStateTask, action: ActionType): TaskStateType => {
    switch(action.type) {
        case 'ADD-TODO-LIST':
            return {...state, [action.todoListId]: []}

        case 'ADD-TASK': 
        const newTask: TaskType = {taskId: v1(), taskTitle: 'new task', description: 'description', priority: "low"}
        return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

        case 'CHANGE-PRIORITY': 
        const priorityList = ['high', 'middle', 'low'];
        const index = priorityList.indexOf(action.priority);
        const newPriority = index === priorityList.length - 1 ? priorityList[0] : priorityList[index + 1]
        return {...state, [action.todoListId]: state[action.todoListId]
            .map(task => task.taskId === action.taskId ? {...task, priority: newPriority} : task)}

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

export const changeTaskPriorityAC = (priority: string, todoListId: string, taskId: string) => {
    return {
        type: 'CHANGE-PRIORITY',
        priority,
        todoListId,
        taskId
    } as const
}