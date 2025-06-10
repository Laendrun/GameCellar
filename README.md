# Game Cellar

A multinlingual, searchable archive of physical games (card games, board games, etc.), focused on preserving, standardizing, and sharing the rules of play.

---

## Project Goals

- Create a digital catalog of tabletop and card games.
- Allow users to search and browse games with clean, consistent rule formatting.
- Access the game rules in multiple languages.
- Provide metadata for each game: player count, duration, published, etc.
- Link to purchase or learn more about the games.
- Expose a public API so anyone can access game data programmatically.
- Prioritize accessibility, clarity, and preservation - not reproduction of copyrighted content.

---

## Core Features

- **Searchable Game Database**
  Search by name, tags, player count, or game type.

- **Standardized Rule Format**
  Rewrittent game rules with consistent formatting.

- **Multilingual Support**
  Language-aware routing (`/en/`, `/fr/`, etc.).

- **Public API**
  A RESTful API to fetch game details and rules in the language of choice.

---

## Tech Stack

### Frontend

- **Vue 3**
- **Vite**

### Backend

- **Express.js**
- **Prisma ORM**
- **SQLite (dev)** -> **PostgreSQL (prod)**

---

## MVP in Progress

The first MVP wil support:

- Browsing and viewing basic game entries
- Language-based URLs and information display
- Backend API for data access
