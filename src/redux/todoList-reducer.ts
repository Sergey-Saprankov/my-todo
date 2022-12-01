import {strict} from "assert";
import {ActionType} from "../type/type";
import {v1} from "uuid";

export type FilterTaskType = 'active' | 'completed' | 'all';

export type TodoListType = {
    todoListId: string
    todoListTitle: string
    filter: FilterTaskType
}

export const initialState: TodoListType[] = [

];

export type AddTodoListACType = ReturnType<typeof addTodoListAC>
export type ChangeFilterTodoListACType = ReturnType<typeof changeFilterTodoListAC>
export type ChangeTodoListACType = ReturnType<typeof changeTodoListAC>


export const todoListReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'ADD-TODO-LIST':
            const newTodoList: TodoListType = {
                todoListId: action.todoListId,
                todoListTitle: 'new todo',
                filter: 'all'
            }
            return [newTodoList, ...state]
        case 'CHANGE-FILTER':
            return [...state.map(t => t.todoListId === action.todoListId ? {...t, filter: action.filter} : t)]
        case 'CHANGE-TODO-LIST-TITLE':
            return [...state.map(t => t.todoListId === action.todoListId ? {...t, todoListTitle: action.todoListTitle} : t) ]
        default:
            return state
    }
}


export const addTodoListAC = () => {
    return {
        type: 'ADD-TODO-LIST',
        todoListId: v1()
        } as const
}

export const changeFilterTodoListAC = (todoListId: string, filter: FilterTaskType) => {
    return {
        type: 'CHANGE-FILTER',
        todoListId,
        filter
    } as const
}


export const changeTodoListAC = (todoListId: string , todoListTitle: string) => {
    return {
        type: 'CHANGE-TODO-LIST-TITLE',
        todoListId,
        todoListTitle
    } as const
}