import {
    AddTaskACType,
    ChangeTaskPriorityACType, ChangeTaskTitleACType,
    DeleteTaskACType, SortTaskACType,
    TaskIsDoneACType,
    taskReducer,
    TaskStateType
} from "./task-reducer";
import {v1} from "uuid";
import {removeTodoListAC, todoListReducer} from "./todoList-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: TaskStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = {
        [todolistId1]: [
            {taskId: "1", taskTitle: "CSS", isDone: false, priority: "low", description: "new task"},
            {taskId: "2", taskTitle: "JS", isDone: true, priority: "low", description: "new task"},
            {taskId: "3", taskTitle: "React", isDone: false, priority: "low", description: "new task"}
        ],
        [todolistId2]: [
            {taskId: "1", taskTitle: "bread", isDone: false, priority: "low", description: "new task"},
            {taskId: "2", taskTitle: "milk", isDone: true, priority: "low", description: "new task"},
            {taskId: "3", taskTitle: "tea", isDone: false, priority: "low", description: "new task"}
        ]
    };
});


test("correct task should be deleted from correct array", () => {

    const action: DeleteTaskACType = {type: "DELETE_TASK", todoListId: todolistId1, taskId: "2"};

    const endState = taskReducer(startState, action);

    expect(endState).toEqual({
        [todolistId1]: [
            {taskId: "1", taskTitle: "CSS", isDone: false, priority: "low", description: "new task"},
            {taskId: "3", taskTitle: "React", isDone: false, priority: "low", description: "new task"}
        ],
        [todolistId2]: [
            {taskId: "1", taskTitle: "bread", isDone: false, priority: "low", description: "new task"},
            {taskId: "2", taskTitle: "milk", isDone: true, priority: "middle", description: "new task"},
            {taskId: "3", taskTitle: "tea", isDone: false, priority: "high", description: "new task"}
        ]
    });
});

test("correct task should be added to correct array", () => {
    const action: AddTaskACType = {type: "ADD-TASK", todoListId: todolistId2};
    const endState = taskReducer(startState, action);

    expect(endState[todolistId2].length).toBe(4);
    expect(endState[todolistId1].length).toBe(3);
    expect(endState[todolistId2][0].taskId).toBeDefined();
    expect(endState[todolistId2][0].taskTitle).toBe("new task");
    expect(endState[todolistId2][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
    const action: TaskIsDoneACType = {type: "TASK-IS-DONE", todoListId: todolistId1, taskId: "3", isDone: true};
    const endState = taskReducer(startState, action);

    expect(endState[todolistId1][2].isDone).toBe(true);
    expect(endState[todolistId1][0].isDone).toBe(false);
});


test("priority of specified task should be changed", () => {
    const action: ChangeTaskPriorityACType = {
        type: "CHANGE-PRIORITY",
        todoListId: todolistId2,
        taskId: "2",
        isDone: true,
        priority: "low"
    };
    const endState = taskReducer(startState, action);

    expect(endState[todolistId2][1].priority).toBe("done");
    expect(endState[todolistId2][1].isDone).toBe(true);

});


test.skip("sort tasks", () => {
    const action: SortTaskACType = {type: "SORT-TASK", todoListId: todolistId2};
    const endTask = taskReducer(startState, action);

    expect(endTask[todolistId2][0]).toBe(
        {taskId: "3", taskTitle: "tea", isDone: false, priority: "high", description: "new task"}
    );
});


test("CHANGE-TASK-TITLE", () => {
    const action: ChangeTaskTitleACType = {type: "CHANGE-TASK-TITLE", todoListId: todolistId2, taskId: '1', taskTitle: 'monday'}
    const endState = taskReducer(startState, action)

    expect(endState[todolistId2][0].taskTitle).toBe('monday')
})



test('property with todolistId should be deleted', () => {


    const action = removeTodoListAC(todolistId1)

    const endState = taskReducer(startState, action)

    expect(endState[todolistId1]).not.toBeDefined()
})


