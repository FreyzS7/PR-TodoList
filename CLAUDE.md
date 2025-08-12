# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint with JS/JSX files
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React learning project built with Vite, featuring multiple demo applications and state management patterns.

### Key Technologies
- **React 18** with React Router DOM for routing
- **Vite** as build tool and dev server
- **Zustand** for state management (primary pattern)
- **Material-UI** and **TailwindCSS** for styling
- **Axios** for HTTP requests
- **FontAwesome** for icons

### Project Structure

#### State Management Patterns
The project demonstrates two state management approaches:
- `src/stores/useTodoStore.js` - Zustand store for todo management
- `src/hooks/useTodoList2.js` - React hooks pattern for state
- Components in `components/todoZustand/` use Zustand
- Components in `components/todoUstate/` use React hooks

#### Custom Hooks
- `src/hooks/pokemon/usePokemon.js` - Pokemon API integration with pagination and audio
- Handles Pokemon list fetching, detail fetching, and audio playback

#### Routing Structure
Main routes defined in `src/App.jsx`:
- `/` - Home with nested MainPage and DetailPage
- `/TodoUstate` - Todo app using React hooks
- `/TodoZustand` - Todo app using Zustand
- `/pokemon` - Pokemon list page
- `/pokemon/detail/` - Pokemon detail page
- `/compare` - Pokemon comparison page

#### API Integration
- Pokemon API integration via `usePokemon` hook
- Uses `https://pokeapi.co/api/v2/` endpoints
- Implements pagination with URL search params

### Development Notes

#### State Management
- Zustand store pattern is preferred for new features
- Todo items have `id`, `taskname`, `type`, and `completed` properties
- Filter functionality supports 'all', 'todo', 'done' states

#### Component Patterns
- Functional components with hooks throughout
- Custom hooks for complex logic (Pokemon API, todo management)
- Material-UI components mixed with custom styling

#### TailwindCSS Configuration
- TailwindCSS is installed but content paths are commented out in config
- May need to uncomment content paths if using Tailwind classes