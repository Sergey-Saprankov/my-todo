import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AddTodo} from "./AddTodo/AddTodo";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "./redux/store";
import {TodoListType} from "./redux/todoList-reducer";
import {TodoList} from "./TodoLIst/TodoList";
import { TaskStateType } from './redux/task-reducer';

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<StoreType, TodoListType[]>(state => state.todoListData)
   
    const todoListsMap = todoLists?.map(({todoListId, todoListTitle, filter}) => {
        return (
            <TodoList key={todoListId} todoListId={todoListId} todoListTitle={todoListTitle} filter={filter}/>
        )
    })
  return (
    <div className="App">
      <AddTodo/>
      <div className='todoListContainer'>
        {todoListsMap}
      </div>
    </div>
  );
}

export default App;
