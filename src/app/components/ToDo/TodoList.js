"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import "./ToDo.scss";

const API_URL_TODOS = "https://669643040312447373c1cf9d.mockapi.io/todos";

const TodoList = ({
    listId,
    active,
    filter = { status: ["Zobrazit vše"], priority: [], date: null, tags: [] },
}) => {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (active) {
            axios.get(`${API_URL_TODOS}?listId=${listId}`).then((response) => {
                setTodos(response.data);
            });
        }
    }, [listId, active]);

    const handleAddClick = () => {
        setShowForm(true);
    };
    // Funkce pro filtrování todů
    const filterTodos = (todos) => {
        let filteredTodos = todos;

        if (filter.status.includes("Zobrazit hotové")) {
            filteredTodos = filteredTodos.filter((todo) => todo.completed);
        }
        if (filter.status.includes("Zobrazit nedokončené")) {
            filteredTodos = filteredTodos.filter((todo) => !todo.completed);
        }
        if (filter.priority.length > 0) {
            filteredTodos = filteredTodos.filter((todo) =>
                filter.priority.includes(todo.priority)
            );
        }
        if (filter.date) {
            filteredTodos = filteredTodos.filter(
                (todo) => todo.dueDate === filter.date
            );
        }
        if (filter.tags.length > 0) {
            filteredTodos = filteredTodos.filter((todo) =>
                filter.tags.every((tag) => todo.tags.includes(tag))
            );
        }

        return filteredTodos;
    };

    const filteredTodos = filterTodos(todos);

    if (!active) return null;

    return (
        <div className="todoList__base">
            <div className="container">
                <button
                    className="btn componentMargin__bottom--xl todoList__btn"
                    onClick={handleAddClick}
                >
                    Add Todo
                </button>
                <TodoForm
                    todos={todos}
                    setTodos={setTodos}
                    showForm={showForm}
                    setShowForm={setShowForm}
                    currentListId={listId}
                />
                <ul className="todoList__list">
                    {filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            setTodos={setTodos}
                            currentListId={listId}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
