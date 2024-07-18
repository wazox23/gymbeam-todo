"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import Modal from "react-modal";
import FilterMenu from "../FilterMenu/FilterMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ToDo.scss";

const API_URL_LISTS = "https://669643040312447373c1cf9d.mockapi.io/lists";
const API_URL_TODOS = "https://669643040312447373c1cf9d.mockapi.io/todos";

const TodoLists = () => {
    const [lists, setLists] = useState([]);
    const [currentListId, setCurrentListId] = useState(null);
    const [showListForm, setShowListForm] = useState(false);
    const [newListTitle, setNewListTitle] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedListId, setSelectedListId] = useState("");
    const [filter, setFilter] = useState({
        status: ["Zobrazit vše"],
        priority: [],
        date: null,
        tags: [],
    });
    const [availableTags, setAvailableTags] = useState([]);
    const [theme, setTheme] = useState("light");

    // Načtení listů při načtení stránky
    useEffect(() => {
        axios
            .get(API_URL_LISTS)
            .then((response) => {
                setLists(response.data);
                if (response.data.length > 0) {
                    setCurrentListId(response.data[0].id);
                }
            })
            .catch((error) => {
                console.error("Error loading lists:", error);
            });

        axios
            .get(API_URL_TODOS)
            .then((response) => {
                const tags = new Set();
                response.data.forEach((todo) => {
                    if (todo.tags) {
                        todo.tags.forEach((tag) => tags.add(tag));
                    }
                });
                setAvailableTags([...tags]);
            })
            .catch((error) => {
                console.error("Error loading tags:", error);
            });
    }, []);

    const handleAddListClick = () => {
        setShowListForm(true);
    };

    const handleDeleteListClick = () => {
        setShowDeleteModal(true);
    };
    // Funkce pro zpracování a přidání nového listu
    const handleAddListSubmit = (e) => {
        e.preventDefault();
        const newList = { title: newListTitle };
        axios
            .post(API_URL_LISTS, newList)
            .then((response) => {
                setLists([...lists, response.data]);
                setNewListTitle("");
                setShowListForm(false);
                setCurrentListId(response.data.id);
            })
            .catch((error) => {
                console.error("Error adding list:", error);
            });
    };
    // Funkce pro mazání listu
    const handleDeleteListSubmit = () => {
        if (selectedListId) {
            axios
                .delete(`${API_URL_LISTS}/${selectedListId}`)
                .then(() => {
                    const updatedLists = lists.filter(
                        (list) => list.id !== selectedListId
                    );
                    setLists(updatedLists);
                    if (updatedLists.length > 0) {
                        setCurrentListId(updatedLists[0].id);
                    } else {
                        setCurrentListId(null);
                    }
                    setShowDeleteModal(false);
                    setSelectedListId("");
                })
                .catch((error) => {
                    console.error("Error deleting list:", error);
                });
        }
    };
    // Funkce pro změnu aktivního listu
    const handleListChange = (id) => {
        setCurrentListId(id);
    };
    // Funkce pro změnu filtru
    const handleFilterChange = (selectedOptions) => {
        setFilter(selectedOptions);
    };
    // Funkce pro přepínání mezi světlým a tmavým režimem
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    return (
        <div className="todoLists__base">
            <div className="container componentMargin__top--2xl">
                <img
                    src="./imgs/logo.png"
                    alt="logo"
                    className="todoLists__logo"
                />
                <div className="tabs__filter-container">
                    <ul className="tabs">
                        {lists.map((list) => (
                            <li key={list.id}>
                                <button
                                    onClick={() => handleListChange(list.id)}
                                    className={`tab ${
                                        currentListId === list.id
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    {list.title}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                className="btn btn--icon"
                                onClick={handleAddListClick}
                            >
                                +
                            </button>
                        </li>
                        <li>
                            <button
                                className="btn btn--icon"
                                onClick={handleDeleteListClick}
                            >
                                -
                            </button>
                        </li>
                    </ul>
                    <div className="tabs__filter-controls">
                        <FilterMenu
                            onFilterChange={handleFilterChange}
                            availableTags={availableTags}
                        />
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                        >
                            {theme === "light" ? (
                                <FontAwesomeIcon icon={faMoon} />
                            ) : (
                                <FontAwesomeIcon icon={faSun} />
                            )}
                        </button>
                    </div>
                </div>
                {lists.map((list) => (
                    <TodoList
                        key={list.id}
                        listId={list.id}
                        active={currentListId === list.id}
                        filter={filter}
                    />
                ))}
            </div>
            {showListForm && (
                <Modal
                    isOpen={showListForm}
                    onRequestClose={() => setShowListForm(false)}
                    contentLabel="Add List"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Add List</h2>
                    <form onSubmit={handleAddListSubmit} className="todoForm">
                        <input
                            type="text"
                            value={newListTitle}
                            onChange={(e) => setNewListTitle(e.target.value)}
                            placeholder="New list title"
                            className="toDo-input"
                        />
                        <button type="submit" className="btn">
                            Add List
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowListForm(false)}
                            className="btn btn--secondary"
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            )}
            {showDeleteModal && (
                <Modal
                    isOpen={showDeleteModal}
                    onRequestClose={() => setShowDeleteModal(false)}
                    contentLabel="Delete List"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Delete List</h2>
                    <div className="todoForm">
                        <select
                            value={selectedListId}
                            onChange={(e) => setSelectedListId(e.target.value)}
                            className="toDo-input"
                        >
                            <option value="">Select a list to delete</option>
                            {lists.map((list) => (
                                <option key={list.id} value={list.id}>
                                    {list.title}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleDeleteListSubmit}
                            className="btn"
                        >
                            Delete List
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowDeleteModal(false)}
                            className="btn btn--secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TodoLists;
