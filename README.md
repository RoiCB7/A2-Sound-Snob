# 🎵 Sound Snob!

##  Overview

This project is a single-page app in React that allows users to browse songs, artists, and genres with relevant information for each category. Users can explore relationships between data and view some analytics in a radial chart for each song.

## Features

* Browse songs, artists, and genres
* View detailed song information
* Radar chart visualization of song attributes
* Navigate between songs, artists, and genres
* UI with a dark theme

## Technologies

* React (Vite)
* React Router
* Node.js
* Express
* Chart.js (react-chartjs-2)

## 📊 Data

The application uses CSV-based datasets for:

* Songs
* Artists
* Genres
* Types

This data is retrieved via a Node API hosted on render.com.
https://song-data-api.onrender.com

## Key Concepts

* Client-server data fetching
* State management using React hooks
* Routing with React Router
* Data visualization using Chart.js

## 🎨 Design

The application uses a dark theme with:

* Deep green backgrounds
* Gold accents for emphasis
* Some Responsive layouts

The overall idea was to try to create a somewhat premium look, atleast in terms of color palate.
Rounded borders look were inspired by Spotify. This was done with CSS and Chart.js

## 🔗 Github Pages Link

Add here

## 📚 Credits

* useEffect hook code reference:
  https://blog.logrocket.com/useeffect-react-hook-complete-guide/
  Under the section titled: 'How to use useEffect for asynchronous tasks?'
  This was integral for the functionality of program especially in terms of state managment

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
