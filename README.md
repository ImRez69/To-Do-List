# To-Do List

A simple and interactive To-Do List web application built with HTML, CSS, and JavaScript. This application allows users to manage their tasks efficiently with features like adding, editing, deleting, and filtering tasks, along with a theme toggle and real-time clock display.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)


## About
The To-Do List is a lightweight, single-page web application designed to help users organize their tasks. It features a clean and responsive interface with a dark/light theme toggle, a real-time clock, and persistent storage using the browser's local storage. The project uses vanilla JavaScript for functionality, custom CSS for styling, and a custom font (Atma) for a unique look.

## Features
- Add Tasks: Add new tasks with a simple input form.
- Edit Tasks: Click on a task to edit its content.
- Delete Tasks: Remove individual tasks with a single click.
- Clear All Tasks: Delete all tasks at once.
- Filter Tasks: Search and filter tasks based on input text.
- Theme Toggle: Switch between dark and light themes, with the preference saved in local storage.
- Real-Time Clock and Date: Displays the current time and date, updated every second.
- Persistent Storage: Tasks are saved in the browser's local storage for persistence across sessions.
- Responsive Design: Optimized for both desktop and mobile devices.
- Error Handling: Displays error messages for empty inputs or duplicate tasks.

## Installation
To run the To-Do List application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ImRez69/To-Do-List.git
   cd To-Do-List


Ensure the font file is included:The project uses the Atma-Regular.ttf font, which should be placed in the Font directory. If you don't have the font, you can replace the font reference in style.css with a fallback font like Arial or download the Atma font.

Open the application:
Open index.html in a web browser (e.g., Chrome, Firefox).
Also can run <a href="https://htmlpreview.github.io/?https://github.com/ImRez69/To-Do-List/blob/main/index.html" target="_blank">Here</a> 
No additional dependencies or build steps are required, as the project uses vanilla HTML, CSS, and JavaScript.

## Usage

Open the application in a web browser.
Add a Task: Enter a task in the input field and click the "Add Item" button or press Enter.
Edit a Task: Click on a task in the list to populate the input field, edit the text, and click "Update" to save changes.
Delete a Task: Click the remove icon (X) next to a task to delete it.
Filter Tasks: Type in the "Filter Item" input to show only tasks matching the search term.
Clear All Tasks: Click the "Clear All" button to remove all tasks.
Toggle Theme: Click the theme button (🌙 or ☀️) to switch between dark and light modes.
The current time and date are displayed in the header, updated in real-time.

## Technologies

HTML5: For the structure of the application.
CSS3: For styling, including responsive design and custom animations.
JavaScript (Vanilla): For interactivity, local storage, and real-time clock functionality.
Atma Font: A custom font for a unique visual style.
