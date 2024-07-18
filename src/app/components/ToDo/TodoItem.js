import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import TodoForm from "./TodoForm";
import "./ToDo.scss";

const API_URL_TODOS = "https://669643040312447373c1cf9d.mockapi.io/todos";

const TodoItem = ({ todo, setTodos, currentListId }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        axios.delete(`${API_URL_TODOS}/${todo.id}`).then(() => {
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
        });
    };

    return (
        <>
            <li className={`todoItem ${todo.completed ? "completed" : ""}`}>
                <span>{todo.title}</span>
                <span className="todoItem__priority">{todo.priority}</span>
                <span className="todoItem__dueDate">{todo.dueDate}</span>
                <span className="todoItem__tags">
                    {todo.tags && todo.tags.join(", ")}
                </span>
                <div className="todoItem__actions">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="todoItem__icon"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button onClick={handleDelete} className="todoItem__icon">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </li>
            {isEditing && (
                <TodoForm
                    todos={[]}
                    setTodos={setTodos}
                    showForm={isEditing}
                    setShowForm={setIsEditing}
                    currentListId={currentListId}
                    initialData={todo}
                />
            )}
        </>
    );
};

export default TodoItem;
