import {strict} from "assert";
import {ActionType} from "../type/type";
import {v1} from "uuid";

type FilterTaskType = 'active' | 'completed' | 'all';

export type TodoListType = {
    todoListId: string
    todoListTitle: string
    filter: FilterTaskType
}

export const initialState: TodoListType[] = [

];

export type AddTodoListACType = ReturnType<typeof addTodoListAC>


export const todoListReducer = (state: TodoListType[] = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'ADD-TODO-LIST':
            const newTodoList: TodoListType = {
                todoListId: action.todoListId,
                todoListTitle: 'new todo',
                filter: 'all'
            }
            return [newTodoList, ...state]
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