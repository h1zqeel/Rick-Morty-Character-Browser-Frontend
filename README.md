# Rick and Morty Character Browser (React)

This project is a Rick and Morty character browser built with React.

## Prerequisites

Ensure you have the following installed:

- Node.js v18 or higher
- npm (Node Package Manager)

The project was built and tested with Node.js v20.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project and add the following:
   ```
   GRAPHQL_URL=<server-url>
   ```
   Replace `<server-url>` with your GraphQL server URL.

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