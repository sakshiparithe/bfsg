# Bug Fixing Simulator

A lightweight web-based game to practice debugging concepts in **JavaScript** and **Python**. Includes:
- Start page
- Login page (localStorage)
- Menu with 20 levels per language
- Language selector (JavaScript/Python)
- Game view with buggy code to fix
- Timed challenges with hints
- Level-complete modal with scoring

## Features
- **20 Levels per Language**: Practice JavaScript and Python debugging
- **Difficulty Progression**: Easy (1-7), Medium (8-14), Hard (15-20)
- **Separate Progress Tracking**: Independent progress for each language
- **Hint System**: Get progressive hints for each level
- **Score System**: Base score + time bonus
- **Progress Visualization**: Visual progress map and statistics

## Run
- Open `C:\Users\sakshi\CascadeProjects\bug-fixing-simulator\index.html` in your browser.
- No server required.

## Progress Storage
- Username: `localStorage` key `bfs_username`
- JavaScript Progress: `localStorage` key `bfs_progress_javascript`
- Python Progress: `localStorage` key `bfs_progress_python`
- Selected Language: `localStorage` key `bfs_language`

## Structure
- `index.html`: Single-page app container and views
- `styles.css`: UI styles and animations
- `levels.js`: JavaScript level data (20 levels)
- `levels-python.js`: Python level data (20 levels)
- `app.js`: Navigation, login, rendering, and game logic

## Customizing Levels
Edit `levels.js` or `levels-python.js` to adjust level content:
- `buggyCode`: The code with bugs
- `correctCode`: The fixed version
- `hints`: Array of progressive hints
- `description`: Explanation of the bug
