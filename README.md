# Rick and Morty Character Browser (React)

This project is a Rick and Morty character browser built with React.

## Prerequisites

Ensure you have the following installed:

- Node.js v18 or higher
- npm (Node Package Manager)
- git 

The project was built and tested with Node.js v20.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:h1zqeel/Rick-Morty-Character-Browser-Frontend.git
   cd Rick-Morty-Character-Browser-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project and add the following:
   ```
   GRAPHQL_URL=https://rick-morty-character-browser-backend.onrender.com/graphql
   ```
   Replace `<server-url>` with your GraphQL local server URL.

## Building and Running

### Production Build

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

### Development Server

To start the development server:

```bash
npm run dev
```

This will start the Vite development server.

## Available Commands

- `dev`: Starts the Vite development server.
- `build`: Builds the TypeScript files (`tsc -b`) and then builds the project with Vite.
- `lint`: Runs ESLint to lint the project files.
- `lint:fix`: Runs ESLint with the `--fix` option to automatically fix linting issues.
- `preview`: Previews the production build with Vite.
- `format`: Formats the TypeScript files using Prettier.
- `test`: Runs Jest for testing.

## API Documentation

### Base URL

```
https://rick-morty-character-browser-backend.onrender.com/graphql
```

### Authentication

This API does not require authentication.

### Queries

#### `characters`

Retrieve a list of characters with pagination support.

##### Arguments

- `page`: Optional. Page number for pagination.
- `filter`: Optional. Filter characters by status or species
- `order`: Optional. Sort order for results.

##### Response

```graphql
type PaginatedCharacters {
  info: CharacterPaginationInfo
  results: [Character]
}

type CharacterPaginationInfo {
  count: Int
  pages: Int
  next: Int
  prev: Int
}

type Character {
  id: ID
  name: String
  image: String
  status: String
  species: String
  location: Location
  origin: Location
  episode: [Episode]
}

type Location {
  id: ID
  name: String
  type: String
  dimension: String
  residents: [Character]!
  created: String
}

type Episode {
  id: ID
  name: String
  air_date: String
  episode: String
  characters: [Character]!
  created: String
}
```

#### `character`

Retrieve a single character by ID.

##### Arguments

- `id`: Required. ID of the character.

##### Response

```graphql
type Character {
  id: ID
  name: String
  image: String
  status: String
  species: String
  location: Location
  origin: Location
  episode: [Episode]
}
```

### Example Queries

#### Retrieve Characters

```graphql
query {
  characters(page: 1, filter: { status: "Alive", species: "Human" }, order: "asc") {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      image
      status
      species
      location {
        id
        name
        type
      }
      origin {
        id
        name
        type
      }
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
}
```

#### Retrieve a Character by ID

```graphql
query {
  character(id: 1) {
    id
    name
    image
    status
    species
    location {
      id
      name
      type
    }
    origin {
      id
      name
      type
    }
    episode {
      id
      name
      air_date
      episode
    }
  }
}
```

### Errors

Errors follow standard GraphQL error handling.

## Access Deployed Version

- **Client**: [Rick and Morty Character Browser Client](https://rick-morty-character-browser.h1zqeel.com/)
- **Backend**: [Rick and Morty Character Browser Backend GraphQL](https://rick-morty-character-browser-backend.onrender.com/graphql)
- As I have utilised Render for Backend Deployment the Backend API Instance Spins down after 15 minutes of InActivity, it gets back up on next incoming request which takes almost 1 Minute. Read More: https://docs.render.com/free#spinning-down-on-idle