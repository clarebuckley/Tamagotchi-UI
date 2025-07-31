import { useState } from "react";

function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  function handleChange(e) {
    setNewTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var toUpdate = {
        id: props.id,
        title: newTitle,
        isComplete: props.isComplete,
        description: "we don't have descriptions yet"
    }
    props.editTask(toUpdate);
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
    <div className="todoContainer">
      <div>
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.isComplete}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.title}
        </label>
      </div>
      <div className="todoButtonContainer">
        <button
          className="actionButton"
          type="button"
          onClick={() => {
            setEditing(true);
          }}>
          Edit
        </button>
        <button
          className="actionButton"
          type="button"
          onClick={() => props.deleteTask(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return <div>{isEditing ? editingTemplate : viewTemplate}</div>;
}

export default Todo;
