import React from "react";

export default function TodoItem({ todo, toggleToDo, deleteToDo }) {
    return (
        <li key={todo.id}>
            <label>
                {" "}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => toggleToDo(todo.id, e.target.checked)}
                />
                {todo.title}
            </label>
            <button
                className="btn btn-danger"
                onClick={() => deleteToDo(todo.id)}
            >
                Delete
            </button>
        </li>
    );
}
