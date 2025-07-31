import { useState } from "react";

function Form(props) {
    const [title, setTitle] = useState("");
    function handleChange(event) {
        setTitle(event.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(title);
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-todo-input"
                name="text"
                autoComplete="off"
                value={title}
                onChange={handleChange}
            />
            <button type="submit" className="addButton">
                Add
            </button>
        </form>
    );
}

export default Form;
