# GymBeam Todo List Application

This project is a simple to-do list web application created for the GymBeam interview process. The application provides basic CRUD operations and allows users to manage multiple to-do lists.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/gymbeam-todo.git
    ```
2. Navigate to the project directory:
    ```bash
    cd gymbeam-todo
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Code Structure

-   `src/app/components/ToDo`: Contains the main to-do components.
-   `src/app/components/FilterMenu`: Contains the filter menu component.

## Components

### TodoLists

-   This component handles the display and management of multiple to-do lists.
-   It fetches the lists and available tags from the API and stores them in state.
-   Provides functionality for adding, deleting, and switching between lists.
-   Includes a filter menu and theme toggle button.

### TodoList

-   This component handles the display and management of a single to-do list.
-   It fetches the to-do items for the active list from the API and stores them in state.
-   Provides functionality for filtering to-do items based on status, priority, due date, and tags.

### TodoItem

-   This component represents a single to-do item.
-   Provides functionality for editing and deleting the item.

### TodoForm

-   This component handles the form for adding and editing to-do items.
-   It manages the form state and handles form submission, which either adds a new item or updates an existing item.

### FilterMenu

-   This component provides a dropdown menu for filtering to-do items.
-   Allows filtering by status, priority, due date, and tags.
-   Automatically closes when clicking outside the menu.

## Styling

-   Styles are defined using SCSS and imported into the respective components.
-   The application uses a mobile-first approach, with styles optimized for mobile devices by default and adjusted for larger screens using media queries.

## Dark Mode

-   The application supports dark mode, which can be toggled using the theme toggle button in the `TodoLists` component.
-   The current theme is stored in state and applied to the document's root element using a `data-theme` attribute.
-   Styles for light and dark modes are defined in the SCSS files.

## GymBeam Todo List Aplikace

Tento projekt je jednoduchá webová aplikace pro správu to-do seznamů vytvořená pro pohovor u firmy GymBeam. Aplikace poskytuje základní CRUD operace a umožňuje uživatelům spravovat více to-do seznamů.

## Instalace

1. Naklonujte repozitář:
    ```bash
    git clone https://github.com/your-username/gymbeam-todo.git
    ```
2. Přesuňte se do adresáře projektu:
    ```bash
    cd gymbeam-todo
    ```
3. Nainstalujte závislosti:
    ```bash
    npm install
    ```

## Použití

1. Spusťte vývojový server:
    ```bash
    npm run dev
    ```
2. Otevřete prohlížeč a přejděte na `http://localhost:3000`.

## Struktura kódu

-   `src/app/components/ToDo`: Obsahuje hlavní komponenty to-do.
-   `src/app/components/FilterMenu`: Obsahuje komponentu pro filtraci.

## Komponenty

### TodoLists

-   Tato komponenta se stará o zobrazení a správu více to-do seznamů.
-   Získává seznamy a dostupné tagy z API a ukládá je do stavu.
-   Poskytuje funkce pro přidání, odstranění a přepínání mezi seznamy.
-   Zahrnuje menu pro filtraci a tlačítko pro přepínání tématu.

### TodoList

-   Tato komponenta se stará o zobrazení a správu jednoho to-do seznamu.
-   Získává to-do položky pro aktivní seznam z API a ukládá je do stavu.
-   Poskytuje funkce pro filtrování to-do položek podle stavu, priority, data splatnosti a tagů.

### TodoItem

-   Tato komponenta představuje jednu to-do položku.
-   Poskytuje funkce pro úpravu a odstranění položky.

### TodoForm

-   Tato komponenta se stará o formulář pro přidání a úpravu to-do položek.
-   Spravuje stav formuláře a zpracovává jeho odeslání, které buď přidá novou položku, nebo aktualizuje existující.

### FilterMenu

-   Tato komponenta poskytuje rozbalovací menu pro filtrování to-do položek.
-   Umožňuje filtrování podle stavu, priority, data splatnosti a tagů.
-   Automaticky se zavře po kliknutí mimo menu.

## Styling

-   Styly jsou definovány pomocí SCSS a importovány do příslušných komponent.
-   Aplikace používá přístup mobile-first, s výchozím nastavením stylů pro mobilní zařízení a úpravami pro větší obrazovky pomocí media queries.

## Tmavý režim

-   Aplikace podporuje tmavý režim, který lze přepínat pomocí tlačítka pro přepínání tématu v komponentě `TodoLists`.
-   Aktuální téma je uloženo ve stavu a aplikováno na root element dokumentu pomocí atributu `data-theme`.
-   Styly pro světlý a tmavý režim jsou definovány v SCSS souborech.
