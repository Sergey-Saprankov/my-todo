import {
    AddTodoListACType,
    ChangeFilterTodoListACType,
    ChangeTodoListTitleACType,
    RemoveTodoListACType
} from "../redux/todoList-reducer";
import {
    AddTaskACType,
    ChangeTaskTitleACType,
    DeleteTaskACType,
    SortTaskACType,
    TaskIsDoneACType
} from "../redux/task-reducer";
import {ChangeTaskPriorityACType} from "../redux/task-reducer";

export type ActionType =
    AddTodoListACType
    | AddTaskACType
    | ChangeTaskPriorityACType
    | DeleteTaskACType
    | TaskIsDoneACType
    | SortTaskACType
    | ChangeFilterTodoListACType
    | RemoveTodoListACType
    | ChangeTodoListTitleACType
    | ChangeTaskTitleACType