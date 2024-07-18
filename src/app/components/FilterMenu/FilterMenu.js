"use client";
import React, { useState, useRef, useEffect } from "react";
import "./FilterMenu.scss";

const FilterMenu = ({ onFilterChange, availableTags }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({
        status: ["Zobrazit vše"],
        priority: [],
        date: null,
        tags: [],
    });
    const menuRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    // Funkce pro filtrování podle statusu
    const handleStatusChange = (option) => {
        const updatedOptions = [option];
        setSelectedOptions({ ...selectedOptions, status: updatedOptions });
        onFilterChange({ ...selectedOptions, status: updatedOptions });
    };
    // Funkce pro filtrování podle priority
    const handlePriorityChange = (option) => {
        let updatedOptions;
        if (selectedOptions.priority.includes(option)) {
            updatedOptions = selectedOptions.priority.filter(
                (item) => item !== option
            );
        } else {
            updatedOptions = [...selectedOptions.priority, option];
        }
        setSelectedOptions({ ...selectedOptions, priority: updatedOptions });
        onFilterChange({ ...selectedOptions, priority: updatedOptions });
    };
    // Funkce pro filtrování podle data
    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedOptions({ ...selectedOptions, date });
        onFilterChange({ ...selectedOptions, date });
    };

    const handleTagChange = (option) => {
        let updatedOptions;
        if (selectedOptions.tags.includes(option)) {
            updatedOptions = selectedOptions.tags.filter(
                (item) => item !== option
            );
        } else {
            updatedOptions = [...selectedOptions.tags, option];
        }
        setSelectedOptions({ ...selectedOptions, tags: updatedOptions });
        onFilterChange({ ...selectedOptions, tags: updatedOptions });
    };
    // Funkce pro zavření menu při kliknutí mimo menu
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    // Funkce pro zavření menu při kliknutí mimo dropdown menu
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="filter-menu" ref={menuRef}>
            <button
                className="filter-menu__dropdown-button"
                onClick={handleToggle}
            >
                {selectedOptions.status.length === 0
                    ? "None selected"
                    : selectedOptions.status.join(", ")}
            </button>
            {isOpen && (
                <div className="filter-menu__dropdown-menu">
                    <div className="filter-menu__section">
                        <h3 className="filter-menu__section__title">Status</h3>
                        <ul className="filter-menu__section__list">
                            <li className="filter-menu__section__list__item">
                                <label className="filter-menu__section__list__item__label">
                                    <input
                                        type="radio"
                                        className="filter-menu__section__list__item__label__input"
                                        checked={selectedOptions.status.includes(
                                            "Zobrazit vše"
                                        )}
                                        onChange={() =>
                                            handleStatusChange("Zobrazit vše")
                                        }
                                    />
                                    Zobrazit vše
                                </label>
                            </li>
                            <li className="filter-menu__section__list__item">
                                <label className="filter-menu__section__list__item__label">
                                    <input
                                        type="radio"
                                        className="filter-menu__section__list__item__label__input"
                                        checked={selectedOptions.status.includes(
                                            "Zobrazit hotové"
                                        )}
                                        onChange={() =>
                                            handleStatusChange(
                                                "Zobrazit hotové"
                                            )
                                        }
                                    />
                                    Zobrazit hotové
                                </label>
                            </li>
                            <li className="filter-menu__section__list__item">
                                <label className="filter-menu__section__list__item__label">
                                    <input
                                        type="radio"
                                        className="filter-menu__section__list__item__label__input"
                                        checked={selectedOptions.status.includes(
                                            "Zobrazit nedokončené"
                                        )}
                                        onChange={() =>
                                            handleStatusChange(
                                                "Zobrazit nedokončené"
                                            )
                                        }
                                    />
                                    Zobrazit nedokončené
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="filter-menu__section">
                        <h3 className="filter-menu__section__title">
                            Priority
                        </h3>
                        <ul className="filter-menu__section__list">
                            <li className="filter-menu__section__list__item">
                                <label className="filter-menu__section__list__item__label">
                                    <input
                                        type="checkbox"
                                        className="filter-menu__section__list__item__label__input"
                                        checked={selectedOptions.priority.includes(
                                            "Low"
                                        )}
                                        onChange={() =>
                                            handlePriorityChange("Low")
                                        }
                                    />
                                    Low
                                </label>
                            </li>
                            <li className="filter-menu__section__list__item">
                                <label className="filter-menu__section__list__item__label">
                                    <input
                                        type="checkbox"
                                        className="filter-menu__section__list__item__label__input"
                                        checked={selectedOptions.priority.includes(
                                            "Medium"
                                        )}
                                        onChange={() =>
                                            handlePriorityChange("Medium")
                                        }
                                    />
                                    Medium
                                </label>
                            </li>
                            <li className="filter-menu__section__list__item">
                                <label className="filter-menu__section__list__item__label">
                                    <input
                                        type="checkbox"
                                        className="filter-menu__section__list__item__label__input"
                                        checked={selectedOptions.priority.includes(
                                            "High"
                                        )}
                                        onChange={() =>
                                            handlePriorityChange("High")
                                        }
                                    />
                                    High
                                </label>
                            </li>
                        </ul>
                    </div>
                    <div className="filter-menu__section">
                        <h3 className="filter-menu__section__title">
                            Due Date
                        </h3>
                        <input
                            type="date"
                            className="filter-menu__section__input-date"
                            value={selectedOptions.date || ""}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="filter-menu__section">
                        <h3 className="filter-menu__section__title">Tags</h3>
                        <ul className="filter-menu__section__list">
                            {availableTags.map((tag) => (
                                <li
                                    key={tag}
                                    className="filter-menu__section__list__item"
                                >
                                    <label className="filter-menu__section__list__item__label">
                                        <input
                                            type="checkbox"
                                            className="filter-menu__section__list__item__label__input"
                                            checked={selectedOptions.tags.includes(
                                                tag
                                            )}
                                            onChange={() =>
                                                handleTagChange(tag)
                                            }
                                        />
                                        {tag}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterMenu;
