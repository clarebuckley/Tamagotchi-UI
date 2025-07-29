import { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newTitle);
    setNewTitle("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={props.id}>
          New title for {props.title}
        </label>
        <input
          id={props.id}
          type="text"
          value={newTitle}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={() => setEditing(false)}>
          Cancel
        </button>
        <button type="submit">
          Save
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div>
      <div>
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.title}
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setEditing(true);
          }}>
          Edit
        </button>
        <button
          type="button"
          onClick={() => props.deleteTask(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return <li>{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
