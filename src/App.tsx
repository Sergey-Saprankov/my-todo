import React, {ChangeEvent, useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import {AddTodo} from "./AddTodo/AddTodo";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "./redux/store";
import {
    addTodoListAC,
    changeFilterTodoListAC, changeTodoListTitleAC,
    FilterTaskType,
    removeTodoListAC,
    TodoListType
} from "./redux/todoList-reducer";
import {TodoList} from "./TodoLIst/TodoList";
import {
    addTaskAC,
    changeTaskPriorityAC, changeTaskTitleAC,
    deleteTaskAC,
    sortTaskAC,
    taskIsDoneAC,
    TaskStateType
} from './redux/task-reducer';

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<StoreType, TodoListType[]>(state => state.todoListData)
    const tasks = useSelector<StoreType, TaskStateType>(
        (state) => state.tasksListData
    );

    const addTodoList = useCallback(() => {
        dispatch(addTodoListAC())
    }, [dispatch])
    const deleteTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])
    const sortTasks = useCallback((todoListId: string) => {
        dispatch(sortTaskAC(todoListId))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todoListId: string, todoListTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, todoListTitle))
    }, [dispatch])

    const changeFilterTodoList = useCallback((todoListId: string, filter: FilterTaskType) => {
        dispatch(changeFilterTodoListAC(todoListId, filter))
    }, [dispatch])

    const addTaskHandler = useCallback((todoListId: string) => {
        dispatch(addTaskAC(todoListId));
    }, [dispatch]);
    const onChangeTaskPriority = useCallback((priority: string, todoListId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskPriorityAC(priority, todoListId, taskId, isDone));
    }, [dispatch])
    const deleteTask = useCallback( (todoListId: string, taskId: string) => {
        dispatch(deleteTaskAC(todoListId, taskId))
    },[])
    const onChangeCheckbox = useCallback( (todoListId: string, taskId: string, value: boolean) => {
        dispatch(taskIsDoneAC(todoListId, taskId, value))
    }, [dispatch])
    const changeTaskTitle = useCallback((todoListId: string,  taskId: string, taskTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, taskTitle))
    }, [])

    const todoListsMap = todoLists?.map(({todoListId, todoListTitle, filter}) => {
        let tasksTodoList = tasks[todoListId]
        return (
            <TodoList onChangeTaskPriority={onChangeTaskPriority}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}
                      deleteTodoList={deleteTodoList}
                      onChangeCheckbox={onChangeCheckbox}
                      deleteTask={deleteTask}
                      changeFilterTodoList={changeFilterTodoList}
                      sortTasks={sortTasks}
                      addTaskHandler={addTaskHandler}
                      tasks={tasksTodoList}
                      key={todoListId}
                      todoListId={todoListId}
                      todoListTitle={todoListTitle}
                      filter={filter}/>
        )
    })


    return (
        <div className="App">
            <AddTodo addTodoList={addTodoList}/>
            <div className='todoListContainer'>
                {todoListsMap}
            </div>
        </div>
    );
}

export default App;
