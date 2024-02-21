import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleToDo, deleteToDo }) {
    return (
        <ul className="list">
            {todos.length == 0 && "No Todos"}
            {todos.map((todo) => {
                return (
                    <TodoItem
                        todo={todo}
                        key={todo.id}
                        toggleToDo={toggleToDo}
                        deleteToDo={deleteToDo}
                    ></TodoItem>
                );
            })}
        </ul>
    );
}
