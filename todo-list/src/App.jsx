import { useEffect, useState } from "react";
import "./styles.css";
import ToDoForm from "./ToDoForm";
import TodoList from "./TodoList";

export default function App() {
    const [todos, setTodos] = useState(() => {
        const localVal = localStorage.getItem("ToDoList");
        if (localVal == null) return [];

        return JSON.parse(localVal);
    });

    useEffect(() => {
        localStorage.setItem("ToDoList", JSON.stringify(todos));
    }, [todos]);

    function addToDO(title) {
        setTodos((currentTodo) => {
            return [
                ...currentTodo,
                {
                    id: crypto.randomUUID(),
                    title,
                    completed: false,
                },
            ];
        });
    }

    function toggleToDo(id, completed) {
        setTodos((currentTodo) => {
            return currentTodo.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }
                return todo;
            });
        });
    }

    function deleteToDo(id) {
        setTodos((currentTodo) => {
            return currentTodo.filter((todo) => todo.id !== id);
        });
    }

    return (
        <>
            <ToDoForm onSubmit={addToDO} />
            <h1 className="header">To DO List</h1>
            <TodoList
                todos={todos}
                toggleToDo={toggleToDo}
                deleteToDo={deleteToDo}
            />
        </>
    );
}
