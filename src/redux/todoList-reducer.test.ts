import {TaskStateType} from "./task-reducer";
import {v1} from "uuid";
import {
    AddTodoListACType,
    changeFilterTodoListAC, changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer,
    TodoListType
} from "./todoList-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TodoListType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {todoListId: todolistId1, todoListTitle: "new todo", filter: "all"}
    ];
});


test("new array should be added when new todolist is added", () => {
        const action: AddTodoListACType = {type: "ADD-TODO-LIST", todoListId: todolistId2};
        const endState = todoListReducer(startState, action);

        expect(endState[0]).toEqual({
            todoListId: todolistId2, todoListTitle: "new todo", filter: "all"
        });

        expect(endState.length).toBe(2);
    }
);

test("new array should be added when new todolist is added", () => {
        const action: AddTodoListACType = {type: "ADD-TODO-LIST", todoListId: todolistId2};
        const endState = todoListReducer(startState, action);

        expect(endState[0]).toEqual({
            todoListId: todolistId2, todoListTitle: "new todo", filter: "all"
        });

        expect(endState.length).toBe(2);
    }
);


test('change title todolist', () => {
    const action = changeTodoListTitleAC(todolistId1, 'monday');
    const endState = todoListReducer(startState, action);

    expect(endState[0].todoListTitle).toBe('monday');
})