import {AddTodoListACType, ChangeFilterTodoListACType, ChangeTodoListACType} from "../redux/todoList-reducer";
import {AddTaskACType, DeleteTaskACType, SortTaskACType, TaskIsDoneACType} from "../redux/task-reducer";
import {ChangeTaskPriorityACType} from "../redux/task-reducer";

export type ActionType =
    AddTodoListACType
    | AddTaskACType
    | ChangeTaskPriorityACType
    | DeleteTaskACType
    | TaskIsDoneACType
    | SortTaskACType
    | ChangeFilterTodoListACType
    | ChangeTodoListACType