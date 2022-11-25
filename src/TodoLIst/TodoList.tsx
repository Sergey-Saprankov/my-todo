import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoListAC, TodoListType } from "../redux/todoList-reducer";
import s from "./TodoList.module.css";
import { StoreType } from "../redux/store";
import {
  addTaskAC,
  TaskStateType,
  changeTaskPriorityAC,
} from "../redux/task-reducer";
import arrows from "../img/arrows.png";

export const TodoList: React.FC<TodoListType> = ({
  todoListTitle,
  todoListId,
  filter,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector<StoreType, TaskStateType>(
    (state) => state.tasksListData
  );

  const addTaskHandler = () => {
    dispatch(addTaskAC(todoListId));
  };

  const tasksMap = tasks[todoListId]?.map((task) => {
    const onChangePriority = () => {
      dispatch(changeTaskPriorityAC(task.priority, todoListId, task.taskId));
    };

    return (
      <div
        className={`${s.taskContainer} ${s[task.priority]}`}
        key={task.taskId}
      >
        <div>
          <div className={s.titleText}>{task.taskTitle}</div>
          <div>{task.description}</div>
          <div className={s.wrapperPriority}>
            <div onClick={onChangePriority} className={s.priorityText}>
              <div>{task.priority}</div>
            </div>
          </div>
        </div>

        <div>
          <input id="highload0" name="highload0" type="checkbox" />
        </div>
      </div>
    );
  });

  return (
    <div className={s.container}>
      <div className={s.title}>{todoListTitle}</div>
      <div className={s.tasksContainer}>{tasksMap}</div>
      <button onClick={addTaskHandler} className={s.btn}>
        add new task
      </button>
    </div>
  );
};
