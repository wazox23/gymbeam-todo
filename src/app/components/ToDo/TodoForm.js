import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./ToDo.scss";

const API_URL_TODOS = "https://669643040312447373c1cf9d.mockapi.io/todos";

const TodoForm = ({
    todos,
    setTodos,
    showForm,
    setShowForm,
    currentListId,
    initialData,
}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [priority, setPriority] = useState(initialData?.priority || "Medium");
    const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
    const [tags, setTags] = useState(initialData?.tags || []);
    const [completed, setCompleted] = useState(initialData?.completed || false);
    const [tagInput, setTagInput] = useState("");

    // Resetování formuláře
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setPriority(initialData.priority);
            setDueDate(initialData.dueDate);
            setTags(initialData.tags);
            setCompleted(initialData.completed);
        } else {
            resetForm();
        }
    }, [initialData]);

    // Odeslání formuláře
    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData) {
            updateTodo();
        } else {
            addTodo();
        }
        setShowForm(false);
    };

    // Přidání nového todo
    const addTodo = () => {
        const todo = {
            title,
            priority,
            dueDate,
            tags,
            completed,
            listId: currentListId,
        };
        axios.post(API_URL_TODOS, todo).then((response) => {
            setTodos([...todos, response.data]);
            resetForm();
        });
    };

    // Aktualizace todo
    const updateTodo = () => {
        const updatedTodo = {
            ...initialData,
            title,
            priority,
            dueDate,
            tags,
            completed,
        };
        axios
            .put(`${API_URL_TODOS}/${initialData.id}`, updatedTodo)
            .then((response) => {
                setTodos((prevTodos) =>
                    prevTodos.map((t) =>
                        t.id === initialData.id ? response.data : t
                    )
                );
            });
    };

    // Resetování formuláře na výchozí hodnoty
    const resetForm = () => {
        setTitle("");
        setPriority("Medium");
        setDueDate("");
        setTags([]);
        setCompleted(false);
        setTagInput("");
    };

    const handleCancel = () => {
        setShowForm(false);
        resetForm();
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (tagInput.trim()) {
                setTags([...tags, tagInput.trim()]);
                setTagInput("");
            }
        }
    };

    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <Modal
            isOpen={showForm}
            onRequestClose={handleCancel}
            contentLabel="Add Todo"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>{initialData ? "Edit Todo" : "Add Todo"}</h2>
            <form onSubmit={handleSubmit} className="todoForm">
                <label>Task Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a new task"
                    className="toDo-input"
                />
                <label>Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="toDo-input"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <label>Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Due Date"
                    className="toDo-input"
                />
                <label>Tags</label>
                <div className="tags__input-container">
                    {tags.map((tag, index) => (
                        <div className="tags__item" key={index}>
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(index)}
                                className="tags__remove-button"
                            >
                                x
                            </button>
                        </div>
                    ))}
                    <input
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagInputKeyDown}
                        placeholder="Tags (press enter to add)"
                        className="toDo-input tags__input"
                    />
                </div>
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => setCompleted(!completed)}
                    />
                    <span>Completed</span>
                </label>
                <button type="submit" className="btn">
                    {initialData ? "Save" : "Add"}
                </button>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn--secondary"
                >
                    Cancel
                </button>
            </form>
        </Modal>
    );
};

export default TodoForm;
