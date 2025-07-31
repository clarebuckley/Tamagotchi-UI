import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";
import { useState } from "react";
import { ChecklistApi } from "../services/checklist.api";
import { IChecklist } from "../interfaces/IChecklist";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.isComplete,
  Completed: (task) => task.isComplete,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function Checklist(props) {
  const [tasks, setTasks] = useState<IChecklist[]>(props.tasks);
  const [filter, setFilter] = useState("All");

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  async function addTask(title) {
    const newTask = { id: "not added yet", title, description: "not added yet", isComplete: false };
    await ChecklistApi.create(newTask)
    setTasks([...tasks, newTask]);
  }

  async function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    await ChecklistApi.delete(id);
  }

  function editTask(checklistItem: IChecklist ) {
    const editedTaskList = tasks.map((task) => {
      if (checklistItem.id === task.id) {
        return checklistItem ;
      }
      return task;
    });

    setTasks(editedTaskList);
    ChecklistApi.update(checklistItem);
  }

  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="checklist-container">
      <h2>CHECKLIST</h2>
      <Form addTask={addTask} />

      <div>{filterList}</div>
      <h3 id="list-heading">{headingText}</h3>
      <ul
        role="list"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default Checklist;
